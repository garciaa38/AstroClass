from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback, MessageBoard, Post
import uuid

post_routes = Blueprint('posts', __name__)

# Get all posts
@post_routes.route('/')
@login_required
def get_posts():
    all_posts = db.session.query(Post).all()

    posts_data = []

    for post in all_posts:
        posts_data.append(post.to_dict())
    
    return jsonify(posts_data)

# Get post by id
@post_routes.route('/<int:post_id>')
@login_required
def get_post_by_id(post_id):
    post = Post.query.get_or_404(post_id)

    return jsonify(post.to_dict())

# Create post
@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    data = request.get_json()
    message_board_id = data.get('message_board_id')
    text_field = data.get('text_field')
    user_id = data.get('user_id')

    if len(text_field) == 0:
        return jsonify({"error": "Text field cannot be empty."})
    
    new_post = Post(
        text_field=text_field,
        user_id=user_id,
        message_board_id=message_board_id
    )

    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

# Update post
@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_post(post_id):
    data = request.get_json()
    text_field = data.get('text_field')

    old_post = Post.query.get_or_404(post_id)

    if len(text_field) == 0:
        return jsonify({"error": "Text field cannot be empty."})
    
    old_post.text_field = text_field

    db.session.commit()

    return jsonify(old_post.to_dict())

# Delete post
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    deleted_post = Post.query.get_or_404(post_id)

    db.session.delete(deleted_post)
    db.session.commit()

    return jsonify({'message': 'Post successfully deleted!'})

