#!/usr/bin/env python3
"""
Detailed test to check backend login database fetching
"""

import requests
import json

def test_backend_detailed():
    print("🔍 Detailed Backend Login Test")
    print("=" * 50)
    
    # Test 1: Check if backend root is accessible
    try:
        print("1. Testing backend root endpoint...")
        response = requests.get("http://localhost:8000/", timeout=5)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            print("   ✅ Backend root accessible")
        else:
            print(f"   ❌ Backend root returned: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Backend root error: {e}")
        return
    
    # Test 2: Check API docs
    try:
        print("\n2. Testing API documentation...")
        response = requests.get("http://localhost:8000/docs", timeout=5)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            print("   ✅ API docs accessible")
        else:
            print(f"   ❌ API docs returned: {response.status_code}")
    except Exception as e:
        print(f"   ❌ API docs error: {e}")
    
    # Test 3: Test login with detailed error handling
    print("\n3. Testing login endpoint...")
    try:
        login_data = {"email": "test@example.com"}
        response = requests.post(
            "http://localhost:8000/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        print(f"   Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            user_data = response.json()
            print("   ✅ Login successful!")
            print(f"   User data: {json.dumps(user_data, indent=2)}")
        elif response.status_code == 404:
            print("   ❌ User not found (404)")
            print("   This means the email doesn't exist in the database")
        elif response.status_code == 500:
            print("   ❌ Internal Server Error (500)")
            print("   This indicates a backend code issue")
            try:
                error_data = response.json()
                print(f"   Error details: {error_data}")
            except:
                print(f"   Raw response: {response.text}")
        else:
            print(f"   ❌ Unexpected status: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("   ❌ Connection refused - backend not running")
    except requests.exceptions.Timeout:
        print("   ❌ Request timeout - backend might be slow")
    except Exception as e:
        print(f"   ❌ Request error: {e}")
    
    # Test 4: Try with a different email format
    print("\n4. Testing with different email...")
    try:
        login_data = {"email": "user@test.com"}
        response = requests.post(
            "http://localhost:8000/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status: {response.status_code}")
        if response.status_code == 404:
            print("   ✅ Backend is working, just no users in database")
        elif response.status_code == 200:
            print("   ✅ Found user in database!")
        else:
            print(f"   ❌ Unexpected response: {response.status_code}")
    except Exception as e:
        print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    test_backend_detailed()
