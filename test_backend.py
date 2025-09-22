#!/usr/bin/env python3
"""
Simple test script to verify backend is running
"""
import requests
import time
import sys

def test_backend():
    base_url = "http://localhost:8000"
    
    print("Testing backend connection...")
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{base_url}/docs", timeout=5)
        if response.status_code == 200:
            print("✅ Backend server is running!")
            print(f"📖 API docs available at: {base_url}/docs")
        else:
            print(f"❌ Server responded with status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server")
        print("Make sure the server is running with: python -m uvicorn main:app --reload")
        return False
    except Exception as e:
        print(f"❌ Error connecting to server: {e}")
        return False
    
    # Test 2: Test register endpoint
    try:
        test_data = {
            "firstName": "Test",
            "lastName": "User", 
            "email": "test@example.com",
            "phone": "",
            "location": "",
            "dateOfBirth": "",
            "gender": "",
            "currentJobTitle": "",
            "currentCompany": "",
            "experienceLevel": "",
            "totalExperience": "",
            "expectedSalary": "",
            "jobType": "",
            "workLocation": "",
            "education": [],
            "technicalSkills": [],
            "softSkills": [],
            "languages": [],
            "workExperience": [],
            "bio": "",
            "portfolio": "",
            "linkedin": "",
            "github": "",
            "website": "",
            "jobPreferences": [],
            "industryPreferences": [],
            "companySize": "",
            "remoteWork": False,
            "willingToRelocate": False
        }
        
        response = requests.post(f"{base_url}/register", json=test_data, timeout=5)
        if response.status_code == 200:
            print("✅ Register endpoint is working!")
            user_data = response.json()
            print(f"📝 Created user with ID: {user_data.get('user_id')}")
        else:
            print(f"❌ Register endpoint failed with status: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing register endpoint: {e}")
        return False
    
    print("\n🎉 Backend is working correctly!")
    print("You can now test the signup functionality in the frontend.")
    return True

if __name__ == "__main__":
    # Wait a moment for server to start
    print("Waiting for server to start...")
    time.sleep(2)
    
    success = test_backend()
    sys.exit(0 if success else 1)
