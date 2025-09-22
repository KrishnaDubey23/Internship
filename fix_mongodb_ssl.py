#!/usr/bin/env python3
"""
Fix MongoDB SSL connection issue
"""

import asyncio
import motor.motor_asyncio
import ssl

async def test_mongodb_with_ssl_fix():
    print("🔧 Testing MongoDB with SSL Fix")
    print("=" * 50)
    
    # Updated connection string with SSL parameters
    MONGODB_URI_FIXED = "mongodb+srv://krishna232501_db_user:tQ3&eUXCQ9hy53@cluster0.krahsqx.mongodb.net/aiintern?retryWrites=true&w=majority&appName=Cluster0&ssl=true&ssl_cert_reqs=CERT_NONE"
    
    try:
        print("1. Connecting with SSL fix...")
        print(f"   Connection String: {MONGODB_URI_FIXED[:50]}...")
        
        # Create MongoDB client with SSL fix
        client = motor.motor_asyncio.AsyncIOMotorClient(
            MONGODB_URI_FIXED, 
            serverSelectionTimeoutMS=10000,
            ssl=True,
            ssl_cert_reqs=ssl.CERT_NONE
        )
        
        print("2. Testing connection...")
        await client.admin.command('ping')
        print("   ✅ MongoDB Atlas connection successful!")
        
        # Test database access
        print("3. Testing database access...")
        db = client.aiintern
        collections = await db.list_collection_names()
        print(f"   ✅ Database accessible! Collections: {collections}")
        
        await client.close()
        print("\n✅ SSL fix worked! MongoDB Atlas is now accessible!")
        return True
        
    except Exception as e:
        print(f"\n❌ SSL fix failed: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_mongodb_with_ssl_fix())
