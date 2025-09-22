#!/usr/bin/env python3
"""
Check database status and user data
"""

import requests
import json

def check_database_status():
    print("🔍 Checking Database Status")
    print("=" * 50)
    
    # Test 1: Check if we can access the API docs
    try:
        print("1. Checking API accessibility...")
        response = requests.get("http://localhost:8000/docs", timeout=5)
        print(f"   ✅ API docs accessible (Status: {response.status_code})")
    except Exception as e:
        print(f"   ❌ Cannot access API: {e}")
        return
    
    # Test 2: Try to register a test user to see if database is working
    print("\n2. Testing database write capability...")
    try:
        test_user = {
            "firstName": "Test",
            "lastName": "User",
            "email": "testuser@example.com",
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
        
        response = requests.post(
            "http://localhost:8000/register",
            json=test_user,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("   ✅ Database write successful!")
            print(f"   User ID: {result.get('user_id', 'N/A')}")
            
            # Now test login with this user
            print("\n3. Testing login with registered user...")
            login_response = requests.post(
                "http://localhost:8000/login",
                json={"email": "testuser@example.com"},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            print(f"   Login Status: {login_response.status_code}")
            
            if login_response.status_code == 200:
                user_data = login_response.json()
                print("   ✅ Login successful!")
                print(f"   Retrieved user data fields: {len(user_data)}")
                print(f"   User ID: {user_data.get('_id', 'N/A')}")
                print(f"   Email: {user_data.get('email', 'N/A')}")
                print(f"   Name: {user_data.get('firstName', 'N/A')} {user_data.get('lastName', 'N/A')}")
                return True
            else:
                print(f"   ❌ Login failed: {login_response.status_code}")
                print(f"   Response: {login_response.text}")
                return False
                
        elif response.status_code == 400:
            print("   ⚠️  User already exists (400)")
            print("   This means database is working, user exists")
            
            # Try login with existing user
            print("\n3. Testing login with existing user...")
            login_response = requests.post(
                "http://localhost:8000/login",
                json={"email": "testuser@example.com"},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            print(f"   Login Status: {login_response.status_code}")
            
            if login_response.status_code == 200:
                user_data = login_response.json()
                print("   ✅ Login successful with existing user!")
                print(f"   Retrieved user data fields: {len(user_data)}")
                return True
            else:
                print(f"   ❌ Login failed: {login_response.status_code}")
                return False
        else:
            print(f"   ❌ Registration failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("   ❌ Database operation timed out")
        print("   This suggests database connection issues")
        return False
    except Exception as e:
        print(f"   ❌ Database test error: {e}")
        return False

if __name__ == "__main__":
    success = check_database_status()
    
    print("\n" + "=" * 50)
    if success:
        print("✅ DATABASE STATUS: Working properly")
        print("   - Backend can write to database")
        print("   - Backend can read from database")
        print("   - Login functionality is working")
    else:
        print("❌ DATABASE STATUS: Issues detected")
        print("   - Check MongoDB Atlas connection")
        print("   - Check backend terminal for errors")
        print("   - Verify database credentials")
