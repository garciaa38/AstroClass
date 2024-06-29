from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(15), nullable=False)
    suffix = db.Column(db.String(30))
    points = db.Column(db.Integer, default=0)
    phone_number = db.Column(db.String(15))
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    class_teacher_rel = db.relationship('Class', backref='user', cascade="all, delete", lazy=True)
    class_student_rel = db.relationship('StudentClass', backref='user', cascade="all, delete", lazy=True)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def get_classes(self):
        return [{
            'id': student_class.id,
            'class_id': student_class.class_id,
            'points': student_class.points
        } for student_class in self.class_student_rel]

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'suffix': self.suffix,
            'points': self.points,
            'phone_number': self.phone_number,
            'classes': self.get_classes()
        }

class Class(db.Model):
    __tablename__ = 'classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String, nullable=False)
    student_count = db.Column(db.Integer, nullable=False, default=0)
    subject = db.Column(db.String(30), nullable=False)
    student_invite_code = db.Column(db.String(255), nullable=False)
    parent_invite_code = db.Column(db.String(255), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    student_class_rel = db.relationship('StudentClass', backref='class', cascade="all, delete", lazy=True)
    class_reward_rel = db.relationship('Reward', backref='class', cascade="all, delete", lazy=True)
    class_feedback_rel = db.relationship('Feedback', backref='class', cascade="all, delete", lazy=True)

    def to_dict(self):
        students = [{
            'id': student.user.id,
            'email': student.user.email,
            'first_name': student.user.first_name,
            'last_name': student.user.last_name,
            'points': student.points,
            'student_class_id': student.id
        } for student in self.student_class_rel]

        print("STUDENT POINTS", students)

        rewards = [{
            'id': reward.id,
            'reward_type': reward.reward_type,
            'points': reward.points
        } for reward in self.class_reward_rel ]

        feedback = [{
            'id': feedback.id,
            'feedback_type': feedback.feedback_type,
            'points': feedback.points
        } for feedback in self.class_feedback_rel ]

        return {
            'id': self.id,
            'class_name': self.class_name,
            'student_count': self.student_count,
            'subject': self.subject,
            'student_invite_code': self.student_invite_code,
            'parent_invite_code': self.parent_invite_code,
            'teacher_id': self.teacher_id,
            'students': students,
            'rewards': rewards,
            'feedback': feedback
        }

class StudentClass(db.Model):
    __tablename__ = 'student_class'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    points = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'points': self.points,
            'student': self.user.to_dict(),
        }

class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    reward_type = db.Column(db.String(20), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    reward_class_rel = db.relationship('Class', backref='reward', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'reward_type': self.reward_type,
            'points': self.points,
            'class_id': self.class_id
        }

class Feedback(db.Model):
    __tablename__ = 'feedback'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    feedback_type = db.Column(db.String(20), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    feedback_class_rel = db.relationship('Class', backref='feedback', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'feedback_type': self.feedback_type,
            'points': self.points,
            'class_id': self.class_id
        }