#!/usr/bin/env python3
"""
Verify user data storage in MongoDB Atlas
This script checks if users are being stored and retrieved correctly
"""

import asyncio
import motor.motor_asyncio
from config import MONGODB_URI
from bson import ObjectId
from datetime import datetime

async def verify_user_data():
    """Verify user data storage in MongoDB"""
    print("🔍 Verifying user data storage in MongoDB Atlas...")
    
    try:
        # Connect to MongoDB
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
        db = client.aiintern
        users_col = db.users
        
        # Check total users
        total_users = await users_col.count_documents({})
        print(f"📊 Total users in database: {total_users}")
        
        if total_users > 0:
            # Get all users
            users = await users_col.find({}).to_list(length=None)
            print(f"\n👥 Users in database:")
            
            for i, user in enumerate(users, 1):
                print(f"\n--- User {i} ---")
                print(f"ID: {user.get('_id')}")
                print(f"Name: {user.get('firstName', 'N/A')} {user.get('lastName', 'N/A')}")
                print(f"Email: {user.get('email', 'N/A')}")
                print(f"Phone: {user.get('phone', 'N/A')}")
                print(f"Location: {user.get('location', 'N/A')}")
                print(f"Created: {user.get('createdAt', 'N/A')}")
                print(f"Technical Skills: {user.get('technicalSkills', [])}")
                print(f"Job Preferences: {user.get('jobPreferences', [])}")
        else:
            print("❌ No users found in database")
            print("💡 Try registering a new user through the frontend")
        
        # Check internships
        internships_col = db.internships
        total_internships = await internships_col.count_documents({})
        print(f"\n📋 Total internships in database: {total_internships}")
        
        if total_internships > 0:
            internships = await internships_col.find({}).to_list(length=3)
            print(f"\n💼 Sample internships:")
            for i, internship in enumerate(internships, 1):
                print(f"\n--- Internship {i} ---")
                print(f"Title: {internship.get('title', 'N/A')}")
                print(f"Company: {internship.get('company', 'N/A')}")
                print(f"Location: {internship.get('location', 'N/A')}")
                print(f"Salary: {internship.get('salary', 'N/A')}")
        
        print(f"\n✅ Database verification completed!")
        print(f"📈 Summary:")
        print(f"   - Users: {total_users}")
        print(f"   - Internships: {total_internships}")
        
    except Exception as e:
        print(f"❌ Error verifying database: {e}")
    finally:
        client.close()

async def test_user_registration():
    """Test user registration process"""
    print("\n🧪 Testing user registration...")
    
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
        db = client.aiintern
        users_col = db.users
        
        # Create a test user
        test_user = {
            "firstName": "Test",
            "lastName": "User",
            "email": f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com",
            "phone": "+1234567890",
            "location": "Test City, TC",
            "dateOfBirth": "2000-01-01",
            "gender": "Other",
            "currentJobTitle": "Student",
            "currentCompany": "Test University",
            "experienceLevel": "Entry",
            "totalExperience": "0-1 years",
            "expectedSalary": "$20-25/hour",
            "jobType": "Internship",
            "workLocation": "Hybrid",
            "education": [
                {
                    "institution": "Test University",
                    "degree": "Bachelor of Science",
                    "field": "Computer Science",
                    "graduationYear": "2024",
                    "gpa": "3.8"
                }
            ],
            "technicalSkills": ["Python", "JavaScript", "React"],
            "softSkills": ["Communication", "Teamwork"],
            "languages": ["English"],
            "workExperience": [],
            "bio": "Test user for verification",
            "portfolio": "https://testuser.dev",
            "linkedin": "https://linkedin.com/in/testuser",
            "github": "https://github.com/testuser",
            "website": "https://testuser.dev",
            "jobPreferences": ["Software Engineering"],
            "industryPreferences": ["Technology"],
            "companySize": "Any",
            "remoteWork": True,
            "willingToRelocate": True,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        
        # Insert test user
        result = await users_col.insert_one(test_user)
        print(f"✅ Test user created with ID: {result.inserted_id}")
        
        # Verify user was stored
        stored_user = await users_col.find_one({"_id": result.inserted_id})
        if stored_user:
            print(f"✅ User data verified in database")
            print(f"   Name: {stored_user['firstName']} {stored_user['lastName']}")
            print(f"   Email: {stored_user['email']}")
        else:
            print("❌ User not found in database")
        
    except Exception as e:
        print(f"❌ Error testing user registration: {e}")
    finally:
        client.close()

async def main():
    """Main verification function"""
    print("🚀 Starting MongoDB Atlas user data verification...")
    
    await verify_user_data()
    await test_user_registration()
    
    print("\n🎉 Verification completed!")
    print("\n💡 Next steps:")
    print("1. Register a new user through the frontend")
    print("2. Run this script again to see the new user")
    print("3. Test login functionality")

if __name__ == "__main__":
    asyncio.run(main())
