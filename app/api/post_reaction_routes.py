from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback, MessageBoard, Post, PostReaction
import uuid

post_reaction_routes = Blueprint('post-reactions', __name__)

# Get all post reactions
@post_reaction_routes.route('/')
@login_required
def get_post_reactions():
    all_post_reactions = db.session.query(PostReaction).all()

    post_reactions_data = []

    for post_reaction in all_post_reactions:
        post_reactions_data.append(post_reaction.to_dict())
    
    return jsonify(post_reactions_data)

# Get post reaction by id
@post_reaction_routes.route('/<int:post_reaction_id>')
@login_required
def get_post_reaction_by_id(post_reaction_id):
    post_reaction = PostReaction.query.get_or_404(post_reaction_id)

    return jsonify(post_reaction.to_dict())

# Create post reaction
@post_reaction_routes.route('/', methods=['POST'])
@login_required
def create_post_reaction():
    data = request.get_json()
    emoji = data.get('emoji')
    user_id = data.get('user_id')
    post_id = data.get('post_id')

    new_post_reaction = PostReaction(
        emoji=emoji,
        user_id=user_id,
        post_id=post_id
    )

    db.session.add(new_post_reaction)
    db.session.commit()

    return jsonify(new_post_reaction.to_dict())

# Delete post reaction
@post_reaction_routes.route('/<int:post_reaction_id>', methods=['DELETE'])
@login_required
def delete_post_reaction(post_reaction_id):
    deleted_post_reaction = PostReaction.query.get_or_404(post_reaction_id)

    db.session.delete(deleted_post_reaction)
    db.session.commit()

    return jsonify({'message': 'Post reaction successfully deleted!'})