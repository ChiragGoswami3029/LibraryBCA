import os
from datetime import timedelta

# Base folder of this project
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Read the database URL from the environment (e.g. Neon PostgreSQL)
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    if not SQLALCHEMY_DATABASE_URI:
        raise RuntimeError("DATABASE_URL environment variable is required.")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key used to sign login tokens (JWT) — loaded from environment
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    if not JWT_SECRET_KEY:
        raise RuntimeError("JWT_SECRET_KEY environment variable is required. Set it in backend/.env")

    # Tokens expire after 24 hours — users must re-login after that
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

    # Max upload size: 50 MB
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024


    # Only these file types can be uploaded (safety)
    ALLOWED_EXTENSIONS = {"pdf", "doc", "docx", "ppt", "pptx", "png", "jpg", "jpeg", "zip", "txt"}

    CATEGORIES = ["Notes", "Assignments", "Important Questions", "Previous Year Papers"]

    # Edit this list to match actual BCA subjects
    SUBJECTS = [
        "Digital System",
        "Mathematics for Data Science",
        "Design and Thinking",
        "Multimedia Technology",
        "Data Structure",
    ]

    SEMESTERS = ["1", "2", "3", "4", "5", "6"]