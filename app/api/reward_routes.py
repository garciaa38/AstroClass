from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward

reward_routes = Blueprint('rewards', __name__)

# Get reward by id
@reward_routes.route('/<int:reward_id>')
@login_required
def get_reward_by_id(reward_id):
    requested_reward = Reward.query.get_or_404(reward_id)

    return jsonify(requested_reward.to_dict())

# Update a reward
@reward_routes.route('/<int:reward_id>', methods=["PUT"])
@login_required
def update_reward(reward_id):
    data = request.get_json()
    reward_type = data.get('reward_type')
    points = data.get('points')
    classId = data.get('classId')
    requested_reward = Reward.query.get_or_404(reward_id)
    requested_class = Class.query.get_or_404(classId)
    
    if int(points) <= 0:
        return jsonify({"error": "Rewards must be higher than 0 points."})

    if reward_type == requested_reward.to_dict()['reward_type']:
        requested_reward.points = points
        db.session.commit()
        return jsonify(requested_class.to_dict())

    
    for reward in requested_class.to_dict()['rewards']:
        if reward_type == reward['reward_type']:
            return jsonify({'error': 'Cannot have more than one of the same reward type.'})

    requested_reward.reward_type = reward_type
    requested_reward.points = points

    db.session.commit()

    return jsonify(requested_class.to_dict())

# Delete a reward
@reward_routes.route('/<int:reward_id>', methods=["DELETE"])
@login_required
def delete_reward(reward_id):
    requested_reward = Reward.query.get_or_404(reward_id)
    data = request.get_json()
    classId = data.get('classId')

    db.session.delete(requested_reward)
    db.session.commit()

    requested_class = Class.query.get_or_404(classId)

    return jsonify(requested_class.to_dict(), {'message': 'Reward successfully deleted!'})