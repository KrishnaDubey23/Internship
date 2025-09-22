#!/usr/bin/env python3
"""
Create a local MongoDB database as fallback
"""

import asyncio
import motor.motor_asyncio
import json

async def create_local_database():
    print("🔧 Creating Local MongoDB Database")
    print("=" * 50)
    
    try:
        # Connect to local MongoDB
        print("1. Connecting to local MongoDB...")
        client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
        
        # Test connection
        await client.admin.command('ping')
        print("   ✅ Local MongoDB connection successful!")
        
        # Create database and collections
        print("2. Creating database and collections...")
        db = client.aiintern
        
        # Create collections
        users_col = db.users
        internships_col = db.internships
        applications_col = db.applications
        
        print("   ✅ Database and collections created!")
        
        # Create a test user
        print("3. Creating test user...")
        test_user = {
            "firstName": "Test",
            "lastName": "User",
            "email": "test@example.com",
            "phone": "1234567890",
            "location": "Test City",
            "dateOfBirth": "1990-01-01",
            "gender": "other",
            "currentJobTitle": "Developer",
            "currentCompany": "Test Company",
            "experienceLevel": "entry",
            "totalExperience": "1-2 years",
            "expectedSalary": "50000",
            "jobType": "full-time",
            "workLocation": "remote",
            "education": [{
                "degree": "Bachelor's",
                "field": "Computer Science",
                "institution": "Test University",
                "graduationYear": "2020",
                "gpa": "3.5"
            }],
            "technicalSkills": ["Python", "JavaScript"],
            "softSkills": ["Communication"],
            "languages": ["English"],
            "workExperience": [{
                "company": "Test Company",
                "position": "Developer",
                "startDate": "2023-01-01",
                "endDate": "",
                "current": True,
                "description": "Test job"
            }],
            "bio": "Test user bio",
            "portfolio": "https://test.com",
            "linkedin": "https://linkedin.com/test",
            "github": "https://github.com/test",
            "website": "https://test.com",
            "jobPreferences": ["remote"],
            "industryPreferences": ["tech"],
            "companySize": "startup",
            "remoteWork": True,
            "willingToRelocate": False
        }
        
        result = await users_col.insert_one(test_user)
        print(f"   ✅ Test user created with ID: {result.inserted_id}")
        
        # Test login
        print("4. Testing login with local database...")
        user = await users_col.find_one({"email": "test@example.com"})
        if user:
            print("   ✅ User found in local database!")
            print(f"   User: {user['firstName']} {user['lastName']}")
            print(f"   Email: {user['email']}")
        
        await client.close()
        print("\n✅ Local database setup complete!")
        print("   You can now use local MongoDB instead of Atlas")
        return True
        
    except Exception as e:
        print(f"\n❌ Local database setup failed: {e}")
        print("\n🔧 To install local MongoDB:")
        print("1. Download MongoDB Community Server")
        print("2. Install and start MongoDB service")
        print("3. Run this script again")
        return False

if __name__ == "__main__":
    success = asyncio.run(create_local_database())
    
    if success:
        print("\n" + "=" * 50)
        print("🔧 NEXT STEPS:")
        print("1. Update src/backend/config.py to use local MongoDB")
        print("2. Change MONGODB_URI to: 'mongodb://localhost:27017/'")
        print("3. Restart the backend server")
        print("4. Test the login functionality")
