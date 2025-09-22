#!/usr/bin/env python3
"""
Test MongoDB Atlas connection directly
"""

import asyncio
import motor.motor_asyncio
from src.backend.config import MONGODB_URI

async def test_mongodb_connection():
    print("🔍 Testing MongoDB Atlas Connection")
    print("=" * 50)
    
    try:
        print("1. Connecting to MongoDB Atlas...")
        print(f"   Connection String: {MONGODB_URI[:50]}...")
        
        # Create MongoDB client
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        
        print("2. Testing connection...")
        # Test the connection
        await client.admin.command('ping')
        print("   ✅ MongoDB Atlas connection successful!")
        
        # Test database access
        print("3. Testing database access...")
        db = client.aiintern
        collections = await db.list_collection_names()
        print(f"   ✅ Database accessible! Collections: {collections}")
        
        # Test user collection
        print("4. Testing user collection...")
        users_col = db.users
        user_count = await users_col.count_documents({})
        print(f"   ✅ User collection accessible! Count: {user_count}")
        
        if user_count > 0:
            # Get a sample user
            sample_user = await users_col.find_one({})
            print(f"   Sample user email: {sample_user.get('email', 'N/A')}")
        
        await client.close()
        print("\n✅ MongoDB Atlas is working properly!")
        return True
        
    except Exception as e:
        print(f"\n❌ MongoDB Atlas connection failed: {e}")
        print("\n🔧 Possible solutions:")
        print("1. Check your internet connection")
        print("2. Verify MongoDB Atlas credentials")
        print("3. Check if MongoDB Atlas cluster is running")
        print("4. Update connection string in config.py")
        return False

if __name__ == "__main__":
    asyncio.run(test_mongodb_connection())
