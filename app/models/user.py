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
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
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
        classes = []
        for student_class in self.class_student_rel:
            class_data = Class.query.get(student_class.class_id)
            if class_data:
                classes.append({
                    'class_id': class_data.id,
                    'class_name': class_data.class_name,
                    'subject': class_data.subject,
                    'points': student_class.points
                })
        return classes

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
    class_name = db.Column(db.String(10), nullable=False)
    student_count = db.Column(db.Integer, nullable=False, default=0)
    subject = db.Column(db.String(20), nullable=False)
    student_invite_code = db.Column(db.String(255), nullable=False)
    parent_invite_code = db.Column(db.String(255), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    student_class_rel = db.relationship('StudentClass', backref='cls', cascade="all, delete", lazy=True)
    class_reward_rel = db.relationship('Reward', backref='class', cascade="all, delete", lazy=True)
    class_feedback_rel = db.relationship('Feedback', backref='class', cascade="all, delete", lazy=True)
    class_message_board_rel = db.relationship('MessageBoard', backref='class', cascade="all, delete", lazy=True)

    def to_dict(self):
        students = [{
            'id': student.user.id,
            'email': student.user.email,
            'first_name': student.user.first_name,
            'last_name': student.user.last_name,
            'points': student.points,
            'student_class_id': student.id
        } for student in self.student_class_rel]

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

        message_board = [message_board.to_dict() for message_board in self.class_message_board_rel]

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
            'feedback': feedback,
            'message_board': message_board
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
        class_data = self.cls
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'class_name': class_data.class_name if class_data else None,
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

class MessageBoard(db.Model):
    __tablename__ = 'message_boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    permission = db.Column(db.String, nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    message_board_post_rel = db.relationship('Post', backref='message_board', cascade="all, delete", lazy=True)

    def to_dict(self):

        posts = [post.to_dict() for post in self.message_board_post_rel]

        return {
            'id': self.id,
            'permission': self.permission,
            'class_id': self.class_id,
            'posts': posts
        }

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text_field = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message_board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('message_boards.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    post_post_image_rel = db.relationship("PostImage", backref="post", cascade="all, delete", lazy=True)
    post_post_reply_rel = db.relationship("PostReply", backref="post", cascade="all, delete", lazy=True)
    post_post_reaction_rel = db.relationship("PostReaction", backref="post", cascade="all, delete", lazy=True)

    def to_dict(self):

        post_image = [post_image.to_dict() for post_image in self.post_post_image_rel]
        post_replies = [post_reply.to_dict() for post_reply in self.post_post_reply_rel]
        post_reactions = [post_reaction.to_dict() for post_reaction in self.post_post_reaction_rel]

        return {
            'id': self.id,
            'text_field': self.text_field,
            'user_id': self.user_id,
            'message_board_id': self.message_board_id,
            'post_image': post_image,
            'post_replies': post_replies,
            'post_reactions': post_reactions
        }

class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'user_id': self.user_id,
            'post_id': self.post_id
        }

class PostReply(db.Model):
    __tablename__ = 'post_replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text_field = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    post_reply_post_reply_reaction_rel = db.relationship("PostReplyReaction", backref="post_reply", cascade="all, delete", lazy=True)

    def to_dict(self):

        post_reply_reactions = [post_reply_reaction.to_dict() for post_reply_reaction in self.post_reply_post_reply_reaction_rel]

        return {
            'id': self.id,
            'text_field': self.text_field,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'post_reply_reactions': post_reply_reactions
        }

class PostReaction(db.Model):
    __tablename__ = 'post_reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    emoji = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'emoji': self.emoji,
            'user_id': self.user_id,
            'post_id': self.post_id
        }

class PostReplyReaction(db.Model):
    __tablename__ = 'post_reply_reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    emoji = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_reply_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('post_replies.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'emoji': self.emoji,
            'user_id': self.user_id,
            'post_reply_id': self.post_reply_id
        }