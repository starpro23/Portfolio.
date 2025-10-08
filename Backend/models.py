from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

db = SQLAlchemy()

class Admin(db.Model):
    __tablename__ =  'admins'

    id = db.Column(db.Integer, primary_key=True)
    profile_picture = db.Column(db.String(255), nullable=True)

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    live_URL = db.Column(db.String(255), nullable=True)
    github_URL = db.Column(db.String(255), nullable=True)
    image_thumbnail = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)






