from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, Class, StudentClass, db, Reward, Feedback, MessageBoard
import uuid

message_board_routes = Blueprint('message-boards', __name__)

# Get all message boards
@message_board_routes.route('/')
@login_required
def get_message_boards():
    all_message_boards = db.session.query(MessageBoard).all()

    message_board_data = []

    for message_board in all_message_boards:
        message_board_data.append(message_board.to_dict())
    
    return jsonify(message_board_data)

# Get message board by id
@message_board_routes.route('/<int:message_board_id>')
@login_required
def get_message_board_by_id(message_board_id):
    message_board = MessageBoard.query.get_or_404(message_board_id)

    return jsonify(message_board.to_dict())