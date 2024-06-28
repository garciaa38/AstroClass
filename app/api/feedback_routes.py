from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Feedback

feedback_routes = Blueprint('feedback', __name__)

# Get Feedback by id
@feedback_routes.route('/<int:feedback_id>')
@login_required
def get_reward_by_id(feedback_id):
    requested_feedback = Feedback.query.get_or_404(feedback_id)

    return jsonify(requested_feedback.to_dict())

# Update feedback
@feedback_routes.route('/<int:feedback_id>', methods=["PUT"])
@login_required
def update_feedback(feedback_id):
    data = request.get_json()
    feedback_type = data.get('feedback_type')
    points = data.get('points')

    requested_feedback = Reward.query.get_or_404(feedback_id)
    requested_feedback.feedback_type = feedback_type
    requested_feedback.points = points

    db.session.commit()

    return jsonify(requested_feedback.to_dict())

# Delete feedback
@feedback_routes.route('/<int:feedback_id>', methods=["DELETE"])
@login_required
def delete_feedback(feedback_id):
    requested_feedback = Feedback.query.get_or_404(feedback_id)

    db.session.delete(requested_feedback)
    db.session.commit()

    return jsonify({'message': 'Feedback successfully deleted!'})