
import os
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import motor.motor_asyncio
from bson import ObjectId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Optional

from config import MONGODB_URI

# Initialize MongoDB connection
try:
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
    db = client.aiintern
    users_col = db.users
    internships_col = db.internships
    applications_col = db.applications
    print("✅ MongoDB Atlas connected successfully")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    print("Please check your MongoDB Atlas connection string in config.py")
    raise e

app = FastAPI()

# Configure CORS origins from environment so deployments (Render + Vercel)
# can set the correct frontend origin without editing code.
#
# Usage: set ALLOWED_ORIGINS to a comma-separated list of origins, e.g.
#   ALLOWED_ORIGINS="http://localhost:3000,https://your-app.vercel.app"
# If you include "*" as an origin, credentials will be disabled because
# browsers block credentialed requests with a wildcard origin.

raw_allowed = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
)
allowed_origins = [o.strip() for o in raw_allowed.split(",") if o.strip()]

# If user provided a wildcard '*' make sure credentials are not allowed
allow_credentials = True
if "*" in allowed_origins:
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

print(f"Configured CORS allowed origins: {allowed_origins}, allow_credentials={allow_credentials}")


@app.get("/_cors")
async def cors_info():
    """Simple endpoint to return current CORS configuration for debugging deployments."""
    return {"allowed_origins": allowed_origins, "allow_credentials": allow_credentials}


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        try:
            return ObjectId(str(v))
        except Exception:
            raise TypeError("Invalid ObjectId")


class Education(BaseModel):
    degree: str
    field: str
    institution: str
    graduationYear: Optional[str] = None
    gpa: Optional[str] = None

class WorkExperience(BaseModel):
    company: str
    position: str
    startDate: str
    endDate: Optional[str] = None
    current: bool = False
    description: Optional[str] = None

class RegisterRequest(BaseModel):
    # Personal Information
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    
    # Professional Information
    currentJobTitle: Optional[str] = None
    currentCompany: Optional[str] = None
    experienceLevel: Optional[str] = None
    totalExperience: Optional[str] = None
    expectedSalary: Optional[str] = None
    jobType: Optional[str] = None
    workLocation: Optional[str] = None
    
    # Education
    education: List[Education] = Field(default_factory=list)
    
    # Skills
    technicalSkills: List[str] = Field(default_factory=list)
    softSkills: List[str] = Field(default_factory=list)
    languages: List[str] = Field(default_factory=list)
    
    # Work Experience
    workExperience: List[WorkExperience] = Field(default_factory=list)
    
    # Additional Information
    bio: Optional[str] = None
    portfolio: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None
    
    # Preferences
    jobPreferences: List[str] = Field(default_factory=list)
    industryPreferences: List[str] = Field(default_factory=list)
    companySize: Optional[str] = None
    remoteWork: bool = False
    willingToRelocate: bool = False


class LoginRequest(BaseModel):
    email: str


class InternshipIn(BaseModel):
    title: str
    company: str
    description: str
    skills: List[str] = Field(default_factory=list)
    location: str
    jobType: str  # full-time, part-time, contract, internship, freelance
    duration: str  # e.g., "12 weeks", "6 months"
    salary: Optional[str] = None
    experienceLevel: str  # entry, mid, senior, lead
    workLocation: str  # remote, hybrid, onsite, flexible
    companySize: str  # startup, small, medium, large, enterprise
    industry: str
    requirements: List[str] = Field(default_factory=list)
    benefits: List[str] = Field(default_factory=list)
    applicationDeadline: Optional[str] = None
    startDate: Optional[str] = None


@app.post("/register")
async def register(payload: RegisterRequest):
    doc = payload.dict()
    existing = await users_col.find_one({"email": doc["email"]})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    res = await users_col.insert_one(doc)
    return {"user_id": str(res.inserted_id)}


@app.post("/login")
async def login(payload: LoginRequest):
    # Temporary debug wrapper: catch exceptions, print traceback to logs,
    # and return the exception detail in the response so we can debug
    # the 500 happening on the deployed Render instance.
    try:
        user = await users_col.find_one({"email": payload.email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Convert ObjectId to string and return user data
        user["_id"] = str(user["_id"])
        return user
    except HTTPException:
        # Re-raise HTTPExceptions unchanged (so 404 remains 404)
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        # Return the error detail in the response for debugging.
        # NOTE: This exposes internal error messages and should be removed
        # after debugging is complete.
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/users/{user_id}")
async def get_user(user_id: str):
    try:
        oid = PyObjectId.validate(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id")
    user = await users_col.find_one({"_id": oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])
    return user


@app.put("/users/{user_id}")
async def update_user(user_id: str, payload: RegisterRequest):
    try:
        oid = PyObjectId.validate(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id")
    doc = payload.dict()
    await users_col.update_one({"_id": oid}, {"$set": doc})
    return {"status": "ok"}


@app.post("/internships")
async def create_internship(item: InternshipIn):
    doc = item.dict()
    res = await internships_col.insert_one(doc)
    return {"internship_id": str(res.inserted_id)}


@app.get("/internships")
async def list_internships():
    items = await internships_col.find().to_list(length=None)
    for it in items:
        it["_id"] = str(it["_id"])
    return items


@app.get("/internships/{intern_id}")
async def get_internship(intern_id: str):
    try:
        oid = PyObjectId.validate(intern_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid internship id")
    it = await internships_col.find_one({"_id": oid})
    if not it:
        raise HTTPException(status_code=404, detail="Not found")
    it["_id"] = str(it["_id"])
    return it


@app.post("/apply")
async def apply(user_id: str = Body(...), internship_id: str = Body(...)):
    try:
        uoid = PyObjectId.validate(user_id)
        ioid = PyObjectId.validate(internship_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ids")
    application = {"user_id": uoid, "internship_id": ioid, "status": "applied"}
    res = await applications_col.insert_one(application)
    return {"application_id": str(res.inserted_id)}


@app.post("/seed_internships")
async def seed_internships(items: List[dict]):
    # Accept raw dicts and insert; useful for quick seeding from frontend or scripts
    if not items:
        return {"inserted": 0}
    res = await internships_col.insert_many(items)
    return {"inserted": len(res.inserted_ids)}


@app.get("/recommendations")
async def recommend(user_id: str, top_n: int = 10):
    try:
        oid = PyObjectId.validate(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id")
    user = await users_col.find_one({"_id": oid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    internships = await internships_col.find().to_list(length=None)
    if not internships:
        return {"recommendations": []}

    # Enhanced recommendation algorithm
    recommendations = []
    
    for internship in internships:
        score = calculate_match_score(user, internship)
        recommendations.append({
            "internship_id": str(internship["_id"]),
            "title": internship.get("title"),
            "company": internship.get("company"),
            "description": internship.get("description"),
            "location": internship.get("location"),
            "jobType": internship.get("jobType"),
            "duration": internship.get("duration"),
            "salary": internship.get("salary"),
            "skills": internship.get("skills", []),
            "experienceLevel": internship.get("experienceLevel"),
            "workLocation": internship.get("workLocation"),
            "companySize": internship.get("companySize"),
            "industry": internship.get("industry"),
            "requirements": internship.get("requirements", []),
            "benefits": internship.get("benefits", []),
            "applicationDeadline": internship.get("applicationDeadline"),
            "startDate": internship.get("startDate"),
            "match": round(score * 100, 1)  # Convert to percentage
        })
    
    # Sort by match score and return top_n
    recommendations.sort(key=lambda x: x["match"], reverse=True)
    return {"recommendations": recommendations[:top_n]}

def calculate_match_score(user, internship):
    """
    Enhanced matching algorithm that considers multiple factors:
    1. Skills match (40%)
    2. Experience level match (20%)
    3. Location preferences (15%)
    4. Company size preferences (10%)
    5. Job type preferences (10%)
    6. Industry preferences (5%)
    """
    total_score = 0.0
    
    # 1. Skills Match (40%)
    user_skills = set([skill.lower() for skill in user.get("technicalSkills", [])])
    internship_skills = set([skill.lower() for skill in internship.get("skills", [])])
    
    if user_skills and internship_skills:
        skills_match = len(user_skills.intersection(internship_skills)) / len(internship_skills)
        total_score += skills_match * 0.4
    
    # 2. Experience Level Match (20%)
    user_exp = user.get("experienceLevel", "")
    internship_exp = internship.get("experienceLevel", "")
    
    exp_scores = {
        ("entry", "entry"): 1.0,
        ("entry", "mid"): 0.7,
        ("mid", "mid"): 1.0,
        ("mid", "senior"): 0.8,
        ("senior", "senior"): 1.0,
        ("senior", "lead"): 0.9,
        ("lead", "lead"): 1.0,
    }
    
    exp_score = exp_scores.get((user_exp, internship_exp), 0.5)
    total_score += exp_score * 0.2
    
    # 3. Location Preferences (15%)
    user_location_pref = user.get("workLocation", "")
    internship_location = internship.get("workLocation", "")
    user_remote_ok = user.get("remoteWork", False)
    user_relocate_ok = user.get("willingToRelocate", False)
    
    if user_location_pref == internship_location:
        location_score = 1.0
    elif internship_location == "remote" and user_remote_ok:
        location_score = 0.9
    elif user_relocate_ok:
        location_score = 0.7
    else:
        location_score = 0.3
    
    total_score += location_score * 0.15
    
    # 4. Company Size Preferences (10%)
    user_company_size = user.get("companySize", "")
    internship_company_size = internship.get("companySize", "")
    
    if user_company_size == internship_company_size:
        company_score = 1.0
    elif not user_company_size:  # No preference
        company_score = 0.8
    else:
        company_score = 0.5
    
    total_score += company_score * 0.1
    
    # 5. Job Type Preferences (10%)
    user_job_type = user.get("jobType", "")
    internship_job_type = internship.get("jobType", "")
    
    if user_job_type == internship_job_type:
        job_type_score = 1.0
    elif not user_job_type:  # No preference
        job_type_score = 0.8
    else:
        job_type_score = 0.5
    
    total_score += job_type_score * 0.1
    
    # 6. Industry Preferences (5%)
    user_industries = set([ind.lower() for ind in user.get("industryPreferences", [])])
    internship_industry = internship.get("industry", "").lower()
    
    if internship_industry in user_industries:
        industry_score = 1.0
    elif not user_industries:  # No preference
        industry_score = 0.8
    else:
        industry_score = 0.5
    
    total_score += industry_score * 0.05
    
    return min(total_score, 1.0)  # Cap at 1.0

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)