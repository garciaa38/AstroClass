from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward

student_routes = Blueprint('students', __name__)

# Get all students
@student_routes.route('/', methods=['GET'])
# @login_required
def get_students():
    print("TEST")
    all_students = (
        db.session.query(User)
        .options(
            joinedload(User.class_student_rel)
        )
            .filter(User.role == 'student')
            .all()
    )

    student_data = []
    for student in all_students:
        class_info = [{
            'id': student_class.class_id,
        } for student_class in student.class_student_rel]

        student_info = {
            'id': student.id,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'email': student.email,
            'classes': class_info
        }

        student_data.append(student_info)
    
    return jsonify(student_data)
