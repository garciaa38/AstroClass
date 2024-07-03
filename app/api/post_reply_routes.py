from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback, MessageBoard, Post, PostReply
import uuid

post_reply_routes = Blueprint('post-replies', __name__)

# Get all post replies
@post_reply_routes.route('/')
@login_required
def get_post_replies():
    all_post_replies = db.session.query(PostReply).all()

    post_replies_data = []

    for post_reply in all_post_replies:
        post_replies_data.append(post_reply.to_dict())

    return jsonify(post_replies_data)

# Get post reply by id
@post_reply_routes.route('/<int:post_reply_id>')
@login_required
def get_post_reply_by_id(post_reply_id):
    post_reply = PostReply.query.get_or_404(post_reply_id)

    return jsonify(post_reply.to_dict())

# Create post reply
@post_reply_routes.route('/', methods=['POST'])
@login_required
def create_post_reply():
    data = request.get_json()
    post_id = data.get('post_id')
    text_field = data.get('text_field')
    user_id = data.get('user_id')

    if len(text_field) == 0:
        return jsonify({"error": "Text field cannot be empty."})
    
    new_post_reply = PostReply(
        text_field=text_field,
        user_id=user_id,
        post_id=post_id
    )

    db.session.add(new_post_reply)
    db.session.commit()

    return jsonify(new_post_reply.to_dict()), 201

# Update post
@post_reply_routes.route('/<int:post_reply_id>', methods=['PUT'])
@login_required
def update_post_reply(post_reply_id):
    data = request.get_json()
    text_field = data.get('text_field')

    old_post_reply = PostReply.query.get_or_404(post_reply_id)

    if len(text_field) == 0:
        return jsonify({"error": "Text field cannot be empty."})
    
    old_post_reply.text_field = text_field

    db.session.commit()

    return jsonify(old_post_reply.to_dict())

# Delete post
@post_reply_routes.route('/<int:post_reply_id>', methods=['DELETE'])
@login_required
def delete_post_reply(post_reply_id):
    deleted_post_reply = PostReply.query.get_or_404(post_reply_id)

    db.session.delete(deleted_post_reply)
    db.session.commit()

    return jsonify({'message': 'Reply successfully deleted!'})