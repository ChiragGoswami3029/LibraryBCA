import os

# Base folder of this project
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    # SQLite database — just a single file, no server setup needed
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key used to sign login tokens (JWT). Change this before deploying!
    JWT_SECRET_KEY = "change-this-to-a-random-secret-string"

    JWT_ACCESS_TOKEN_EXPIRES = False # stay logged in until you log out.
    
    # Where uploaded assignment files are physically stored
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

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