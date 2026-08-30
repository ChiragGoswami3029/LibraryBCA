import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db
from routes.auth import auth_bp
from routes.files import files_bp
from routes.comments import comments_bp
from routes.follow import follow_bp
from routes.meta import meta_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Make sure the uploads folder actually exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Allow the frontend (on a different domain) to talk to this backend
    CORS(app)

    db.init_app(app)
    JWTManager(app)

    # Register the two "counters": /register /login and /upload /files ...
    app.register_blueprint(auth_bp)
    app.register_blueprint(files_bp)
    app.register_blueprint(comments_bp)
    app.register_blueprint(follow_bp)
    app.register_blueprint(meta_bp)

    with app.app_context():
        db.create_all()  # creates database.db and tables if they don't exist yet

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)