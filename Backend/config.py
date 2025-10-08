# Backend/config.py
import os
from dotenv import load_dotenv
basedir = os.path.dirname(__file__)
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    DATABASE_URI = os.getenv('DATABASE_URI') or os.getenv('DATABASE_URL')
    if DATABASE_URI:
        SQLALCHEMY_DATABASE_URI = DATABASE_URI
    else:
        # fallback for local dev
        SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'local_dev.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallback_secret_key')
    UPLOAD_FOLDER = os.path.join(basedir, "uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}