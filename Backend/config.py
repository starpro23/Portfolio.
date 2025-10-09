# Backend/config.py
import os
from dotenv import load_dotenv

# Load environment variables
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    # Prefer DATABASE_URL (Render, Neon, etc.)
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    # Fallback to local SQLite if no database is found
    if not SQLALCHEMY_DATABASE_URI:
        SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "local_dev.db")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key (used by Flask sessions & security)
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")

    # File upload configurations
    UPLOAD_FOLDER = os.path.join(basedir, "uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
