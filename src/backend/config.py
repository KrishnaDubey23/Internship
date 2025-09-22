"""
Configuration file for MongoDB connection
Update this file with your MongoDB Atlas connection string
"""

import os

# MongoDB Atlas Connection String
# Replace this with your actual MongoDB Atlas connection string
MONGODB_URI = os.getenv(
    "MONGODB_URI", 
    "mongodb+srv://krishna232501_db_user:tQ3&eUXCQ9hy53@cluster0.krahsqx.mongodb.net/aiintern?retryWrites=true&w=majority&appName=Cluster0"
)

# Database name
DATABASE_NAME = "aiintern"

# Collection names
COLLECTIONS = {
    "users": "users",
    "internships": "internships", 
    "applications": "applications"
}
