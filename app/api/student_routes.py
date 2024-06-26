from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback

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
            'points': student_class.points
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

# Get all students in a class
@student_routes.route('/<int:class_id>')
@login_required
def get_students_in_class(class_id):
    students_in_class = (
        db.session.query(User)
        .join(StudentClass, StudentClass.student_id == User.id)
        .filter(StudentClass.class_id == class_id, User.role == 'student')
        .options(joinedload(User.class_student_rel))
        .all()
    )

    student_data = []
    for student in students_in_class:
        class_info = [{
            'id': student_class.class_id,
        } for student_class in student.class_student_rel]

        student_info = {
            'id': student.id,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'email': student.email,
            'points': student.points,
            'classes': class_info
        }
        student_data.append(student_info)
    
    return jsonify(student_data)

# Give student points
@student_routes.route('/student-class/<int:student_class_id>/rewards/<int:reward_id>', methods=['PUT'])
@login_required
def give_student_points(student_class_id, reward_id):
    student = StudentClass.query.get_or_404(student_class_id)
    reward = Reward.query.get_or_404(reward_id)
    requested_class = Class.query.get_or_404(student.class_id)

    print("STUDENT CLASS", student.to_dict())

    added_points = reward.points

    student.points += added_points

    db.session.commit()

    return jsonify(requested_class.to_dict())

# Remove student points
@student_routes.route('/student-class/<int:student_class_id>/feedback/<int:feedback_id>', methods=['PUT'])
@login_required
def remove_student_points(student_class_id, feedback_id):
    student = StudentClass.query.get_or_404(student_class_id)
    feedback = Feedback.query.get_or_404(feedback_id)
    requested_class = Class.query.get_or_404(student.class_id)

    print("STUDENT CLASS", student.to_dict())

    lost_points = feedback.points

    student.points += lost_points

    db.session.commit()

    return jsonify(requested_class.to_dict())

# Edit student information
@student_routes.route('/<int:student_id>/class/<int:class_id>', methods=['PUT'])
@login_required
def edit_student(student_id, class_id):
    student = User.query.get_or_404(student_id)
    print("EDIT STUDENT", student.to_dict())

    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    student.first_name = first_name
    student.last_name = last_name

    db.session.commit()

    requested_class = Class.query.get_or_404(class_id)

    return jsonify(requested_class.to_dict())

# Remove student from class
@student_routes.route('/<int:student_class_id>', methods=["DELETE"])
@login_required
def remove_student(student_class_id):
    student = StudentClass.query.get_or_404(student_class_id)
    requested_class = Class.query.get_or_404(student.class_id)

    db.session.delete(student)
    db.session.commit()

    return jsonify(requested_class.to_dict())

# Student joins a class
@student_routes.route('/<int:student_id>', methods=['POST'])
@login_required
def student_join_class(student_id):
    data = request.get_json()
    class_code = data.get('class_code')

    requested_class = Class.query.filter(Class.student_invite_code == class_code).first()

    new_student = StudentClass(
        student_id=student_id,
        class_id=requested_class.id,
        points=0
    )

    db.session.add(new_student)
    db.session.commit()

    requested_class.student_count += 1

    db.session.commit()

    return jsonify(requested_class.to_dict())

