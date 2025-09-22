#!/usr/bin/env python3
"""
Test MongoDB Atlas connection
"""

import asyncio
import motor.motor_asyncio
from config import MONGODB_URI

async def test_connection():
    """Test MongoDB Atlas connection"""
    print("🔗 Testing MongoDB Atlas connection...")
    print(f"Connection string: {MONGODB_URI[:50]}...")
    
    try:
        # Create client
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
        
        # Test connection
        result = await client.admin.command('ping')
        print("✅ MongoDB Atlas connection successful!")
        print(f"Ping result: {result}")
        
        # Test database access
        db = client.aiintern
        collections = await db.list_collection_names()
        print(f"📊 Available collections: {collections}")
        
        # Close connection
        client.close()
        print("🎉 Connection test completed successfully!")
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        print("\n🔧 Troubleshooting tips:")
        print("1. Make sure your IP address is whitelisted in MongoDB Atlas")
        print("2. Check if the username and password are correct")
        print("3. Verify the cluster name in the connection string")
        print("4. Ensure the database user has proper permissions")

if __name__ == "__main__":
    asyncio.run(test_connection())
