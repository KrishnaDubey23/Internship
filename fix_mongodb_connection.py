#!/usr/bin/env python3
"""
Fix MongoDB connection with proper SSL configuration
"""

import asyncio
import motor.motor_asyncio

async def test_mongodb_connection_fixed():
    print("🔧 Testing MongoDB Connection Fix")
    print("=" * 50)
    
    # Try different connection approaches
    connection_strings = [
        # Original connection string
        "mongodb+srv://krishna232501_db_user:tQ3&eUXCQ9hy53@cluster0.krahsqx.mongodb.net/aiintern?retryWrites=true&w=majority&appName=Cluster0",
        
        # With SSL parameters
        "mongodb+srv://krishna232501_db_user:tQ3&eUXCQ9hy53@cluster0.krahsqx.mongodb.net/aiintern?retryWrites=true&w=majority&appName=Cluster0&ssl=true",
        
        # With timeout parameters
        "mongodb+srv://krishna232501_db_user:tQ3&eUXCQ9hy53@cluster0.krahsqx.mongodb.net/aiintern?retryWrites=true&w=majority&appName=Cluster0&serverSelectionTimeoutMS=10000",
        
        # With connection timeout
        "mongodb+srv://krishna232501_db_user:tQ3&eUXCQ9hy53@cluster0.krahsqx.mongodb.net/aiintern?retryWrites=true&w=majority&appName=Cluster0&connectTimeoutMS=10000"
    ]
    
    for i, uri in enumerate(connection_strings, 1):
        print(f"\n{i}. Testing connection string {i}...")
        try:
            client = motor.motor_asyncio.AsyncIOMotorClient(uri, serverSelectionTimeoutMS=10000)
            
            # Test connection
            await client.admin.command('ping')
            print(f"   ✅ Connection {i} successful!")
            
            # Test database
            db = client.aiintern
            collections = await db.list_collection_names()
            print(f"   ✅ Database accessible! Collections: {collections}")
            
            await client.close()
            print(f"\n🎉 SOLUTION FOUND: Use connection string {i}")
            print(f"   Working URI: {uri}")
            return uri
            
        except Exception as e:
            print(f"   ❌ Connection {i} failed: {str(e)[:100]}...")
            continue
    
    print("\n❌ All connection attempts failed")
    return None

if __name__ == "__main__":
    working_uri = asyncio.run(test_mongodb_connection_fixed())
    
    if working_uri:
        print("\n" + "=" * 50)
        print("🔧 NEXT STEPS:")
        print("1. Update src/backend/config.py with the working connection string")
        print("2. Restart the backend server")
        print("3. Test the login functionality")
    else:
        print("\n" + "=" * 50)
        print("🔧 ALTERNATIVE SOLUTIONS:")
        print("1. Check MongoDB Atlas dashboard")
        print("2. Verify cluster is running")
        print("3. Check network connectivity")
        print("4. Try creating a new MongoDB Atlas cluster")
