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
    points = db.Column(db.Integer)
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

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'suffix': self.suffix,
            'points': self.points,
            'phone_number': self.phone_number
        }

class Class(db.Model):
    __tablename__ = 'classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_count = db.Column(db.Integer, nullable=False)
    subject = db.Column(db.String(30), nullable=False)
    student_invite_code = db.Column(db.String(255), nullable=False)
    parent_invite_code = db.Column(db.String(255), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    student_class_rel = db.relationship('StudentClass', backref='class', cascade="all, delete", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_count': self.student_count,
            'subject': self.subject,
            'student_invite_code': self.student_invite_code,
            'parent_invite_code': self.parent_invite_code,
            'teacher_id': self.teacher_id
        }

class StudentClass(db.Model):
    __tablename__ = 'student_class'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'student': self.user.to_dict(),
        }