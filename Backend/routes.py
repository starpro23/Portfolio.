from flask import Blueprint, request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
import os
from .models import db, Project, Admin

api = Blueprint('api', __name__)

@api.route('/upload/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

# Update Admin profile picture
@api.route('/admin/profile/upload', methods=['POST'])
def upload_profile_picture():
    admin = Admin.query.first()
    if 'image' not in request.files:
        return jsonify({"Error": "File Not Found"}), 400

    image = request.files['image']
    filename = secure_filename(image.filename)
    path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    image.save(path)

    admin.profile_picture = filename
    db.session.commit()
    return jsonify({
        "message": "Profile picture updated successfully",
        "image_url": f"/upload/{filename}"
    }), 200

# Add a new project
@api.route('/projects/upload', methods=['POST'])
def add_project():
    data = request.form
    image = request.files.get('thumbnail')

    project = Project(
        title=data.get('title'),
        description=data.get('description'),
        live_URL=data.get('live_URL'),
        github_URL=data.get('github_URL')
    )

    if image:
        filename = secure_filename(image.filename)
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(path)
        project.image_thumbnail = f"/upload/{filename}"

    db.session.add(project)
    db.session.commit()

    return jsonify({"message": "Project added successfully"}), 201

# Fetch all projects
@api.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([
        {
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'live_URL': p.live_URL,
            'github_URL': p.github_URL,
            'image_thumbnail': p.image_thumbnail
        } for p in projects
    ])
