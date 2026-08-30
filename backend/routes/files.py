
import os
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models import db, FileItem, Notification, Follow
 
files_bp = Blueprint("files", __name__)
 
def allowed_file(filename):
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    return ext in current_app.config["ALLOWED_EXTENSIONS"]
 
 
def notify_followers(file_record):
    # Alert every user following this subject that a new file landed
    followers = Follow.query.filter_by(subject=file_record.subject).all()
    for f in followers:
        if f.user_id == file_record.uploader_id:
            continue  # don't notify yourself about your own upload
        note = Notification(
            user_id=f.user_id,
            file_id=file_record.id,
            message=f'New {file_record.category} uploaded for {file_record.subject}: "{file_record.title}"',
        )
        db.session.add(note)
    db.session.commit()
 
 
@files_bp.route("/upload", methods=["POST"])
@jwt_required()  # must be logged in
def upload_file():
    user_id = int(get_jwt_identity())
 
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
 
    file = request.files["file"]
    title = request.form.get("title")
    category = request.form.get("category")
    subject = request.form.get("subject")
    semester = request.form.get("semester")
 
    if not title or not category or not subject or not semester:
        return jsonify({"error": "title, category, subject and semester are required"}), 400
 
    if category not in current_app.config["CATEGORIES"]:
        return jsonify({"error": f"category must be one of {current_app.config['CATEGORIES']}"}), 400
 
    if not file.filename or not allowed_file(file.filename):
        return jsonify({"error": "Invalid or missing file type"}), 400
 
    original_name = secure_filename(file.filename)
    stored_name = f"{user_id}_{title[:20]}_{original_name}".replace(" ", "_")
    save_path = os.path.join(current_app.config["UPLOAD_FOLDER"], stored_name)
    file.save(save_path)
 
    record = FileItem(
        title=title,         # type: ignore
        category=category,    # type: ignore
        subject=subject,       # type: ignore
        semester=semester,    # type: ignore
        filename=stored_name,   # type: ignore
        original_name=original_name,   # type: ignore
        uploader_id=user_id,       # type: ignore
    )  # type: ignore
    db.session.add(record)
    db.session.commit()
 
    notify_followers(record)
 
    return jsonify({"message": "File uploaded", "file": record.to_dict()}), 201
 
 
@files_bp.route("/files", methods=["GET"])
def list_files():
    # Filters: ?category=Notes&subject=Math&semester=3
    # Search: ?q=keyword  (matches title, subject, or uploader name)
    # Sort: ?sort=newest|oldest|alphabetical  (default newest)
    category = request.args.get("category")
    subject = request.args.get("subject")
    semester = request.args.get("semester")
    q = request.args.get("q")
    sort = request.args.get("sort", "newest")
 
    query = FileItem.query
    if category:
        query = query.filter_by(category=category)
    if subject:
        query = query.filter_by(subject=subject)
    if semester:
        query = query.filter_by(semester=semester)
 
    if q:
        from models import User
        like = f"%{q}%"
        query = query.join(User, FileItem.uploader_id == User.id).filter(
            db.or_(
                FileItem.title.ilike(like),
                FileItem.subject.ilike(like),
                User.name.ilike(like),
            )
        )
 
    if sort == "alphabetical":
        query = query.order_by(FileItem.title.asc())
    elif sort == "oldest":
        query = query.order_by(FileItem.upload_date.asc())
    else:  # newest (default)
        query = query.order_by(FileItem.upload_date.desc())
 
    results = query.all()
    return jsonify([f.to_dict() for f in results]), 200
 
 
@files_bp.route("/files/<int:file_id>/download", methods=["GET"])
def download_file(file_id):
    record = FileItem.query.get_or_404(file_id)
    return send_from_directory(
        current_app.config["UPLOAD_FOLDER"],
        record.filename,
        as_attachment=True,
        download_name=record.original_name,
    )
 
 
@files_bp.route("/files/<int:file_id>/view", methods=["GET"])
def view_file(file_id):
    # Same file, but NOT forced as a download — lets the browser show a PDF inline
    record = FileItem.query.get_or_404(file_id)
    return send_from_directory(
        current_app.config["UPLOAD_FOLDER"],
        record.filename,
        as_attachment=False,
    )
 
 
@files_bp.route("/my-files", methods=["GET"])
@jwt_required()
def my_files():
    user_id = int(get_jwt_identity())
    results = FileItem.query.filter_by(uploader_id=user_id).order_by(FileItem.upload_date.desc()).all()
    return jsonify([f.to_dict() for f in results]), 200
 
 
@files_bp.route("/files/<int:file_id>", methods=["PATCH"])
@jwt_required()
def update_file(file_id):
    user_id = int(get_jwt_identity())
    record = FileItem.query.get_or_404(file_id)
 
    if record.uploader_id != user_id:
        return jsonify({"error": "You can only edit your own uploads"}), 403
 
    data = request.get_json() or {}
    if "title" in data:
        record.title = data["title"]
    if "category" in data:
        if data["category"] not in current_app.config["CATEGORIES"]:
            return jsonify({"error": "Invalid category"}), 400
        record.category = data["category"]
    if "subject" in data:
        record.subject = data["subject"]
    if "semester" in data:
        record.semester = data["semester"]
 
    db.session.commit()
    return jsonify({"message": "File updated", "file": record.to_dict()}), 200
 
 
@files_bp.route("/files/<int:file_id>", methods=["DELETE"])
@jwt_required()
def delete_file(file_id):
    user_id = int(get_jwt_identity())
    record = FileItem.query.get_or_404(file_id)
 
    if record.uploader_id != user_id:
        return jsonify({"error": "You can only delete your own uploads"}), 403
 
    file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], record.filename)
    if os.path.exists(file_path):
        os.remove(file_path)
 
    db.session.delete(record)  # comments cascade-delete automatically
    db.session.commit()
    return jsonify({"message": "File deleted"}), 200
 
