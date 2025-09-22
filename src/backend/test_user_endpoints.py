#!/usr/bin/env python3
"""
Test user registration and login endpoints with MongoDB
"""

import requests
import json
import time
from datetime import datetime

def test_user_registration():
    """Test user registration endpoint"""
    print("🧪 Testing user registration endpoint...")
    
    # Test user data
    test_user_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": f"john.doe.{int(time.time())}@example.com",  # Unique email
        "phone": "+1234567890",
        "location": "San Francisco, CA",
        "dateOfBirth": "2000-01-01",
        "gender": "Male",
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
        "portfolio": "https://johndoe.dev",
        "linkedin": "https://linkedin.com/in/johndoe",
        "github": "https://github.com/johndoe",
        "website": "https://johndoe.dev",
        "jobPreferences": ["Software Engineering", "Data Science"],
        "industryPreferences": ["Technology", "Finance"],
        "companySize": "Any",
        "remoteWork": True,
        "willingToRelocate": True
    }
    
    try:
        # Test registration
        response = requests.post(
            "http://localhost:8000/register",
            json=test_user_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"📊 Registration response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ User registered successfully!")
            print(f"   User ID: {result.get('user_id', 'N/A')}")
            print(f"   Message: {result.get('message', 'N/A')}")
            return result.get('user_id')
        else:
            print(f"❌ Registration failed: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Registration request failed: {e}")
        return None

def test_user_login(email):
    """Test user login endpoint"""
    print(f"\n🧪 Testing user login endpoint for: {email}")
    
    try:
        # Test login
        response = requests.post(
            "http://localhost:8000/login",
            json={"email": email},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"📊 Login response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ User login successful!")
            print(f"   User ID: {result.get('user_id', 'N/A')}")
            print(f"   Name: {result.get('firstName', 'N/A')} {result.get('lastName', 'N/A')}")
            print(f"   Email: {result.get('email', 'N/A')}")
            return result
        else:
            print(f"❌ Login failed: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Login request failed: {e}")
        return None

def test_get_user(user_id):
    """Test get user endpoint"""
    print(f"\n🧪 Testing get user endpoint for ID: {user_id}")
    
    try:
        # Test get user
        response = requests.get(
            f"http://localhost:8000/users/{user_id}",
            timeout=10
        )
        
        print(f"📊 Get user response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ User data retrieved successfully!")
            print(f"   Name: {result.get('firstName', 'N/A')} {result.get('lastName', 'N/A')}")
            print(f"   Email: {result.get('email', 'N/A')}")
            print(f"   Skills: {result.get('technicalSkills', [])}")
            print(f"   Preferences: {result.get('jobPreferences', [])}")
            return result
        else:
            print(f"❌ Get user failed: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get user request failed: {e}")
        return None

def main():
    """Main test function"""
    print("🚀 Testing user endpoints with MongoDB Atlas...")
    print("=" * 50)
    
    # Test registration
    user_id = test_user_registration()
    
    if user_id:
        # Test login
        email = f"john.doe.{int(time.time())}@example.com"
        login_result = test_user_login(email)
        
        if login_result:
            # Test get user
            test_get_user(user_id)
    
    print("\n" + "=" * 50)
    print("🎉 User endpoint testing completed!")
    print("\n💡 Next steps:")
    print("1. Check MongoDB Atlas dashboard to see the stored user data")
    print("2. Test the frontend signup and login flow")
    print("3. Verify user data persistence across sessions")

if __name__ == "__main__":
    main()
