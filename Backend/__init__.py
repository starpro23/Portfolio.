from flask import Flask, send_from_directory
from flask_cors import CORS
from .config import Config
from .models import db
from .routes import api
import os

def create_app():
    app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    app.register_blueprint(api, url_prefix='/api')

    # Ensure upload folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # --- Serve frontend ---
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        dist_path = os.path.join(app.root_path, "../frontend/dist")
        if path != "" and os.path.exists(os.path.join(dist_path, path)):
            return send_from_directory(dist_path, path)
        else:
            return send_from_directory(dist_path, "index.html")

    return app
