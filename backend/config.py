import os

# Base folder of this project
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    # SQLite database — just a single file, no server setup needed
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Secret key used to sign login tokens (JWT). Change this before deploying!
    JWT_SECRET_KEY = "change-this-to-a-random-secret-string"

    # Where uploaded assignment files are physically stored
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    # Only these file types can be uploaded (safety)
    ALLOWED_EXTENSIONS = {"pdf", "doc", "docx", "ppt", "pptx", "png", "jpg", "jpeg", "zip", "txt"}

    CATEGORIES = ["Notes", "Assignments", "Important Questions", "Previous Year Papers"]

    # Edit this list to match your actual BCA subjects
    SUBJECTS = [
        "Python", "PHP", "Data Structures", "Database Management",
        "UML/OOP Concepts", "Mathematics", "Web Development",
    ]

    SEMESTERS = ["1", "2", "3", "4", "5", "6"]