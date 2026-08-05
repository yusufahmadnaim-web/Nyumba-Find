import os
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

# Render sometimes provides postgres:// instead of postgresql://
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://nyumbafind_db_user:fSkhThSYKyEHBSPkGXbw2SkqRlO5Q7sg@dpg-d9p36pm417fc73844ah0-a.oregon-postgres.render.com/nyumbafind_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")