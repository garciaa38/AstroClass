from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward

reward_routes = Blueprint('rewards', __name__)

#Get reward by id
@reward_routes.route('/<int:reward_id>')
@login_required
def get_reward_by_id(reward_id):
    requested_reward = Reward.query.get_or_404(reward_id)

    return jsonify(requested_reward.to_dict())

#Update a reward
@reward_routes.route('/<int:reward_id>', methods=["PUT"])
@login_required
def update_reward(reward_id):
    data = request.get_json()
    reward_type = data.get('reward_type')
    points = data.get('points')

    requested_reward = Reward.query.get_or_404(reward_id)
    requested_reward.reward_type = reward_type
    requested_reward.points = points

    db.session.commit()

    return jsonify(requested_reward.to_dict())

#Delete a reward
@reward_routes.route('/<int:reward_id>', methods=["DELETE"])
@login_required
def delete_reward(reward_id):
    requested_reward = Reward.query.get_or_404(reward_id)

    db.session.delete(requested_reward)
    db.session.commit()

    return jsonify({'message': 'Reward successfully deleted!'})