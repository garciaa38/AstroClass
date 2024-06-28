from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback
import uuid

class_routes = Blueprint('classes', __name__)

#Helper Functions

# Generates an 8 character invite code for students
def generate_student_code():
    while True:
        class_code = str(uuid.uuid4())[:8]
        if not Class.query.filter_by(student_invite_code=class_code).first():
            return class_code

def generate_parent_code():
    while True:
        class_code = str(uuid.uuid4())[:8]
        if not Class.query.filter_by(parent_invite_code=class_code).first():
            return class_code

def teacher_check(user):
    if user.role == 'teacher':
        return True
    return False

def check_student_in_class(student_id, student_list):
    for student in student_list:
        print("STUDENT CHECK", student)
        if student_id == student['id']:
            return True
    return False

# Create a new class
@class_routes.route('/<int:teacher_id>/class', methods=['POST'])
@login_required
def create_class(teacher_id):
    data = request.get_json()
    class_name = data.get("class_name")
    subject = data.get("subject")
    student_invite_code = generate_student_code()
    parent_invite_code = generate_parent_code()

    if len(subject) == 0:
        return jsonify({"error": "Subject cannot be empty."}), 401

    if (current_user.id != teacher_id) or (teacher_check(current_user) is False):
        return jsonify({"error": "Unauthorized access"}), 403

    new_class = Class(
        student_count=0,
        class_name=class_name,
        subject=subject,
        student_invite_code=student_invite_code,
        parent_invite_code=parent_invite_code,
        teacher_id=teacher_id
    )

    db.session.add(new_class)
    db.session.commit()

    return jsonify(new_class.to_dict()), 201

# Get all classes by teacher id
@class_routes.route('/<int:teacher_id>', methods=['GET'])
@login_required
def get_classes(teacher_id):
    teacher = User.query.get_or_404(teacher_id)

    if (current_user.id != teacher_id) or (teacher_check(current_user) is False):
        return jsonify({"error": "Unauthorized access"}), 403

    classes = (
        db.session.query(Class)
            .options(joinedload(Class.student_class_rel).joinedload(StudentClass.user))
            .filter(Class.teacher_id == teacher_id)
            .all()
    )

    class_data = []
    for class_ in classes:
        print("CLASSES DICT", class_.to_dict())
        class_info = class_.to_dict()
        class_data.append(class_info)
    
    return jsonify(class_data)

# Get a class by it's class id
@class_routes.route('/<int:teacher_id>/class/<int:class_id>', methods=['GET'])
@login_required
def get_class(teacher_id, class_id):
    teacher = User.query.get_or_404(teacher_id)


    requested_class = (
        db.session.query(Class)
            .options(joinedload(Class.student_class_rel).joinedload(StudentClass.user))
            .filter(Class.id == class_id)
            .first()
    )

    if (current_user.id != teacher_id) or (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403
    
    return jsonify(requested_class.to_dict())

# Add a student to a class
@class_routes.route('/class/<int:class_id>/students/<int:student_id>', methods=['POST'])
@login_required
def add_student_to_class(class_id, student_id):
    requested_class = Class.query.get_or_404(class_id)
    requested_student = User.query.get_or_404(student_id)

    class_dict = requested_class.to_dict()
    student_list = class_dict['students']

    if check_student_in_class(student_id, student_list) is True:
        return jsonify({'error': 'Student is already enrolled in class.'}), 403

    new_student = StudentClass(
        student_id=requested_student.id,
        class_id=requested_class.id,
        points=0
    )

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403

    db.session.add(new_student)
    db.session.commit()

    requested_class.student_count += 1

    db.session.commit()

    return jsonify(requested_class.to_dict())

# Remove a student from a class
@class_routes.route('/class/<int:class_id>/students/<int:student_id>', methods=['DELETE'])
@login_required
def remove_student_from_class(class_id, student_id):
    requested_class = Class.query.get_or_404(class_id)
    requested_student = User.query.get_or_404(student_id)

    student_class_entry = (
        StudentClass.query
        .filter_by(class_id=class_id, student_id=student_id)
        .first_or_404()
    )

    print("STUDENT CLASS ENTRY", student_class_entry)

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403

    db.session.delete(student_class_entry)
    db.session.commit()

    requested_class.student_count -= 1

    db.session.commit()

    return jsonify({"message": "Student removed from class successfully"}), 200


# Edit a class
@class_routes.route('/class/<int:class_id>', methods=['PUT'])
@login_required
def edit_class(class_id):
    requested_class = Class.query.get_or_404(class_id)
    data = request.get_json()
    class_name = data.get('class_name')
    subject = data.get('subject')

    requested_class.class_name = class_name
    requested_class.subject = subject

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403

    db.session.commit()

    return jsonify(requested_class.to_dict())

# Delete a class
@class_routes.route('/class/<int:class_id>', methods=['DELETE'])
@login_required
def delete_class(class_id):
    requested_class = Class.query.get_or_404(class_id)

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403

    db.session.delete(requested_class)
    db.session.commit()

    return jsonify({"message": "Class successfully deleted."})

# Get all rewards from a class
@class_routes.route('/class/<int:class_id>/rewards')
@login_required
def get_rewards(class_id):
    requested_class = Class.query.get_or_404(class_id)

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403
    
    class_rewards = (
        db.session.query(Reward)
            .filter(Reward.class_id == class_id)
            .all()
    )


    reward_data = []
    for reward in class_rewards:
        reward_info ={
            'id': reward.id,
            'reward_type': reward.reward_type,
            'points': reward.points
        }

        reward_data.append(reward_info)
    
    return jsonify(reward_data)


# Create a reward for a class
@class_routes.route('/class/<int:class_id>/rewards', methods=["POST"])
@login_required
def create_reward(class_id):
    requested_class = Class.query.get_or_404(class_id)

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403
    
    data = request.get_json()
    reward_type = data.get("reward_type")
    points = data.get("points")

    if int(points) <= 0:
        return jsonify({"error": "Rewards must be higher than 0 points."})
    
    new_reward = Reward(
        reward_type=reward_type,
        points=points,
        class_id=class_id
    )

    db.session.add(new_reward)
    db.session.commit()

    return jsonify(requested_class.to_dict()), 201

# Get all feedback from a class
@class_routes.route('/class/<int:class_id>/feedback')
@login_required
def get_feedback(class_id):
    requested_class = Class.query.get_or_404(class_id)

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403
    
    class_feedback = (
        db.session.query(Feedback)
            .filter(Feedback.class_id == class_id)
            .all()
    )

    feedback_data = []
    for feedback in class_feedback:
        feedback_data.append(feedback.to_dict())
    
    return jsonify(feedback_data)


# Create feedback for a class
@class_routes.route('/class/<int:class_id>/feedback', methods=["POST"])
@login_required
def create_feedback(class_id):
    requested_class = Class.query.get_or_404(class_id)

    if (teacher_check(current_user) is False) or (current_user.id != requested_class.teacher_id):
        return jsonify({"error": "Unauthorized access"}), 403
    
    data = request.get_json()
    feedback_type = data.get("feedback_type")
    points = data.get("points")

    if points >= 0:
        return jsonify({"error": "Feedback points must be negative."})
    
    new_feedback = Feedback(
        feedback_type=feedback_type,
        points=points,
        class_id=class_id
    )

    db.session.add(new_feedback)
    db.session.commit()

    return jsonify(new_feedback.to_dict()), 201