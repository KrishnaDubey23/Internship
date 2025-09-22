#!/usr/bin/env python3
"""
Database seeding script for AI Internship Platform
This script will populate MongoDB with sample data
"""

import asyncio
import json
import motor.motor_asyncio
from bson import ObjectId
from datetime import datetime, timedelta
import random

# MongoDB connection
from config import MONGODB_URI
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
db = client.aiintern

# Collections
users_col = db.users
internships_col = db.internships
applications_col = db.applications

# Sample internship data
SAMPLE_INTERNSHIPS = [
    {
        "title": "Software Engineering Intern",
        "company": "TechCorp Inc.",
        "location": "San Francisco, CA",
        "jobType": "Full-time",
        "duration": "3 months",
        "salary": "$25-30/hour",
        "experienceLevel": "Entry",
        "workLocation": "Hybrid",
        "companySize": "Large (1000+)",
        "industry": "Technology",
        "description": "Join our engineering team to work on cutting-edge web applications using React, Node.js, and cloud technologies.",
        "requirements": [
            "Currently pursuing Computer Science degree",
            "Experience with JavaScript/TypeScript",
            "Basic understanding of React",
            "Strong problem-solving skills"
        ],
        "benefits": [
            "Mentorship program",
            "Flexible work hours",
            "Free lunch",
            "Networking opportunities"
        ],
        "applicationDeadline": (datetime.now() + timedelta(days=30)).isoformat(),
        "startDate": (datetime.now() + timedelta(days=45)).isoformat(),
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    },
    {
        "title": "Data Science Intern",
        "company": "DataFlow Analytics",
        "location": "New York, NY",
        "jobType": "Part-time",
        "duration": "6 months",
        "salary": "$20-25/hour",
        "experienceLevel": "Entry",
        "workLocation": "Remote",
        "companySize": "Medium (100-500)",
        "industry": "Data & Analytics",
        "description": "Work with our data team to analyze large datasets and build machine learning models for business insights.",
        "requirements": [
            "Python programming skills",
            "Basic knowledge of statistics",
            "Experience with pandas/numpy",
            "SQL knowledge preferred"
        ],
        "benefits": [
            "Remote work flexibility",
            "Learning stipend",
            "Team building events",
            "Career development workshops"
        ],
        "applicationDeadline": (datetime.now() + timedelta(days=45)).isoformat(),
        "startDate": (datetime.now() + timedelta(days=60)).isoformat(),
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    },
    {
        "title": "Marketing Intern",
        "company": "Creative Agency Co.",
        "location": "Los Angeles, CA",
        "jobType": "Full-time",
        "duration": "4 months",
        "salary": "$18-22/hour",
        "experienceLevel": "Entry",
        "workLocation": "On-site",
        "companySize": "Small (10-50)",
        "industry": "Marketing & Advertising",
        "description": "Support our marketing team with social media campaigns, content creation, and client presentations.",
        "requirements": [
            "Marketing or Communications major",
            "Social media experience",
            "Creative writing skills",
            "Adobe Creative Suite knowledge"
        ],
        "benefits": [
            "Portfolio building opportunities",
            "Client interaction experience",
            "Creative freedom",
            "Small team environment"
        ],
        "applicationDeadline": (datetime.now() + timedelta(days=20)).isoformat(),
        "startDate": (datetime.now() + timedelta(days=35)).isoformat(),
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    },
    {
        "title": "Product Management Intern",
        "company": "StartupXYZ",
        "location": "Austin, TX",
        "jobType": "Full-time",
        "duration": "3 months",
        "salary": "$22-28/hour",
        "experienceLevel": "Intermediate",
        "workLocation": "Hybrid",
        "companySize": "Startup (10-50)",
        "industry": "Technology",
        "description": "Work directly with the product team to define features, conduct user research, and coordinate with engineering teams.",
        "requirements": [
            "Business or Engineering background",
            "Analytical thinking",
            "User research experience preferred",
            "Strong communication skills"
        ],
        "benefits": [
            "Direct mentorship from PM",
            "High impact projects",
            "Equity participation",
            "Fast-paced learning"
        ],
        "applicationDeadline": (datetime.now() + timedelta(days=25)).isoformat(),
        "startDate": (datetime.now() + timedelta(days=40)).isoformat(),
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    },
    {
        "title": "UX/UI Design Intern",
        "company": "DesignStudio Pro",
        "location": "Seattle, WA",
        "jobType": "Part-time",
        "duration": "6 months",
        "salary": "$20-25/hour",
        "experienceLevel": "Entry",
        "workLocation": "Remote",
        "companySize": "Medium (50-200)",
        "industry": "Design",
        "description": "Collaborate with our design team to create user interfaces, conduct usability testing, and develop design systems.",
        "requirements": [
            "Design portfolio required",
            "Figma proficiency",
            "User research basics",
            "Understanding of design principles"
        ],
        "benefits": [
            "Design tool licenses",
            "Portfolio review sessions",
            "Client project exposure",
            "Design community access"
        ],
        "applicationDeadline": (datetime.now() + timedelta(days=35)).isoformat(),
        "startDate": (datetime.now() + timedelta(days=50)).isoformat(),
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    }
]

async def clear_database():
    """Clear existing data from all collections"""
    print("🗑️ Clearing existing data...")
    await users_col.delete_many({})
    await internships_col.delete_many({})
    await applications_col.delete_many({})
    print("✅ Database cleared")

async def seed_internships():
    """Seed internships collection with sample data"""
    print("🌱 Seeding internships...")
    
    # Convert to list of documents
    internships = []
    for internship in SAMPLE_INTERNSHIPS:
        internship["_id"] = ObjectId()
        internships.append(internship)
    
    result = await internships_col.insert_many(internships)
    print(f"✅ Inserted {len(result.inserted_ids)} internships")
    return result.inserted_ids

async def seed_test_user():
    """Create a test user for development"""
    print("👤 Creating test user...")
    
    test_user = {
        "_id": ObjectId(),
        "firstName": "Test",
        "lastName": "User",
        "email": "test@example.com",
        "phone": "+1234567890",
        "location": "San Francisco, CA",
        "dateOfBirth": "2000-01-01",
        "gender": "Other",
        "currentJobTitle": "Student",
        "currentCompany": "University",
        "experienceLevel": "Entry",
        "totalExperience": "0-1 years",
        "expectedSalary": "$20-25/hour",
        "jobType": "Internship",
        "workLocation": "Hybrid",
        "education": [
            {
                "institution": "University of California",
                "degree": "Bachelor of Science",
                "field": "Computer Science",
                "graduationYear": "2024",
                "gpa": "3.8"
            }
        ],
        "technicalSkills": ["Python", "JavaScript", "React", "SQL"],
        "softSkills": ["Communication", "Teamwork", "Problem Solving"],
        "languages": ["English", "Spanish"],
        "workExperience": [],
        "bio": "Passionate computer science student looking for internship opportunities.",
        "portfolio": "https://testuser.dev",
        "linkedin": "https://linkedin.com/in/testuser",
        "github": "https://github.com/testuser",
        "website": "https://testuser.dev",
        "jobPreferences": ["Software Engineering", "Data Science"],
        "industryPreferences": ["Technology", "Finance"],
        "companySize": "Any",
        "remoteWork": True,
        "willingToRelocate": True,
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    }
    
    result = await users_col.insert_one(test_user)
    print(f"✅ Created test user with ID: {result.inserted_id}")
    return result.inserted_id

async def main():
    """Main seeding function"""
    print("🚀 Starting database seeding...")
    
    try:
        # Test connection
        await client.admin.command('ping')
        print("✅ MongoDB connection successful")
        
        # Clear and seed
        await clear_database()
        await seed_internships()
        await seed_test_user()
        
        print("\n🎉 Database seeding completed successfully!")
        print("\n📊 Summary:")
        print(f"   - Internships: {len(SAMPLE_INTERNSHIPS)}")
        print(f"   - Test User: 1")
        print(f"   - Applications: 0")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(main())
