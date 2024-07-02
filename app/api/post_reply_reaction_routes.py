from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback, MessageBoard, Post, PostReaction, PostReply, PostReplyReaction
import uuid

post_reply_reaction_routes = Blueprint('post-reply-reactions', __name__)

# Get all post reply reactions
@post_reply_reaction_routes.route('/')
@login_required
def get_post_reply_reactions():
    all_post_reply_reactions = db.session.query(PostReplyReaction).all()

    post_reply_reactions_data = []

    for post_reply_reaction in all_post_reply_reactions:
        post_reply_reactions_data.append(post_reply_reaction.to_dict())
    
    return jsonify(post_reply_reactions_data)

# Get post reply reaction by id
@post_reply_reaction_routes.route('/<int:post_reply_reaction_id>')
@login_required
def get_post_reply_reaction_by_id(post_reply_reaction_id):
    post_reply_reaction = PostReplyReaction.query.get_or_404(post_reply_reaction_id)

    return jsonify(post_reply_reaction.to_dict())

# Create post reply reaction
@post_reply_reaction_routes.route('/', methods=['POST'])
@login_required
def create_post_reply_reaction():
    data = request.get_json()
    emoji = data.get('emoji')
    user_id = data.get('user_id')
    post_reply_id = data.get('post_reply_id')

    new_post_reply_reaction = PostReplyReaction(
        emoji=emoji,
        user_id=user_id,
        post_reply_id=post_reply_id
    )

    db.session.add(new_post_reply_reaction)
    db.session.commit()

    return jsonify(new_post_reply_reaction.to_dict())

# Delete post reply reaction
@post_reply_reaction_routes.route('/<int:post_reply_reaction_id>', methods=['DELETE'])
@login_required
def delete_post_reply_reaction(post_reply_reaction_id):
    deleted_post_reply_reaction = PostReplyReaction.query.get_or_404(post_reply_reaction_id)

    db.session.delete(deleted_post_reply_reaction)
    db.session.commit()

    return jsonify({'message': 'Post reply reaction successfully deleted!'})