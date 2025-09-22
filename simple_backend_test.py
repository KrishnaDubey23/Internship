#!/usr/bin/env python3
"""
Minimal backend test to verify the issue
"""
import json
import urllib.request
import urllib.error

def test_backend_simple():
    try:
        # Test if any server is running on port 8000
        response = urllib.request.urlopen('http://localhost:8000/docs', timeout=5)
        print("✅ Backend is running on port 8000")
        return True
    except urllib.error.URLError:
        print("❌ No server on port 8000")
        
    try:
        # Test if any server is running on port 3001
        response = urllib.request.urlopen('http://localhost:3001/docs', timeout=5)
        print("✅ Backend is running on port 3001")
        return True
    except urllib.error.URLError:
        print("❌ No server on port 3001")
    
    print("\n🔧 To fix this:")
    print("1. Open a new terminal")
    print("2. Run: cd src/backend")
    print("3. Run: python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000")
    print("4. Or try port 3001: python -m uvicorn main:app --reload --host 0.0.0.0 --port 3001")
    
    return False

if __name__ == "__main__":
    test_backend_simple()
