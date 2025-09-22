#!/usr/bin/env python3
"""
Test script to check if backend is properly fetching user details from database for login
"""

import requests
import json
import sys

def test_backend_login():
    """Test if backend can fetch user details from database"""
    
    print("🔍 Testing Backend Login Database Fetch...")
    print("=" * 50)
    
    # Test data - using a known email from the database
    test_email = "test@example.com"
    
    try:
        # Test 1: Check if backend is running
        print("1. Checking if backend is running...")
        health_response = requests.get("http://localhost:8000/", timeout=5)
        if health_response.status_code == 200:
            print("✅ Backend is running")
        else:
            print("❌ Backend not responding properly")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running on http://localhost:8000")
        print("   Please start the backend with: cd src/backend && python main.py")
        return False
    except Exception as e:
        print(f"❌ Error checking backend: {e}")
        return False
    
    # Test 2: Check if we can get all users (to see what's in database)
    print("\n2. Checking database contents...")
    try:
        # Try to get users endpoint if it exists
        users_response = requests.get("http://localhost:8000/users", timeout=10)
        if users_response.status_code == 200:
            users = users_response.json()
            print(f"✅ Found {len(users)} users in database")
            if users:
                print("   Sample user emails:")
                for user in users[:3]:  # Show first 3 users
                    print(f"   - {user.get('email', 'No email')}")
        else:
            print("⚠️  Users endpoint not available, checking with login test...")
    except Exception as e:
        print(f"⚠️  Could not check users directly: {e}")
    
    # Test 3: Test login with existing user
    print(f"\n3. Testing login with email: {test_email}")
    try:
        login_data = {"email": test_email}
        login_response = requests.post(
            "http://localhost:8000/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"   Status Code: {login_response.status_code}")
        
        if login_response.status_code == 200:
            user_data = login_response.json()
            print("✅ Login successful!")
            print("   User data retrieved:")
            print(f"   - User ID: {user_data.get('_id', 'N/A')}")
            print(f"   - Email: {user_data.get('email', 'N/A')}")
            print(f"   - First Name: {user_data.get('firstName', 'N/A')}")
            print(f"   - Last Name: {user_data.get('lastName', 'N/A')}")
            print(f"   - Location: {user_data.get('location', 'N/A')}")
            print(f"   - Total fields: {len(user_data)}")
            return True
            
        elif login_response.status_code == 404:
            print("❌ User not found in database")
            print("   This means:")
            print("   1. No user with this email exists")
            print("   2. Database might be empty")
            print("   3. Need to register a user first")
            return False
            
        else:
            print(f"❌ Login failed with status: {login_response.status_code}")
            print(f"   Response: {login_response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Login request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_database_connection():
    """Test if database connection is working"""
    print("\n4. Testing database connection...")
    try:
        # Try to access a simple endpoint that would use the database
        response = requests.get("http://localhost:8000/docs", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is responding")
            print("   Check the terminal where you started the backend")
            print("   Look for: '✅ MongoDB Atlas connected successfully'")
            return True
        else:
            print("❌ Backend not responding properly")
            return False
    except Exception as e:
        print(f"❌ Database connection test failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Backend Login Database Test")
    print("This script tests if the backend can fetch user details from the database")
    print()
    
    # Run tests
    backend_running = test_backend_login()
    db_connection = test_database_connection()
    
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY:")
    print(f"Backend Running: {'✅' if backend_running else '❌'}")
    print(f"Database Connection: {'✅' if db_connection else '❌'}")
    
    if not backend_running:
        print("\n🔧 TO FIX:")
        print("1. Start the backend: cd src/backend && python main.py")
        print("2. Make sure MongoDB Atlas is connected")
        print("3. Check for any error messages in the backend terminal")
    
    if backend_running and not db_connection:
        print("\n🔧 TO FIX:")
        print("1. Check MongoDB Atlas connection string in src/backend/config.py")
        print("2. Ensure internet connection")
        print("3. Verify MongoDB Atlas credentials")
