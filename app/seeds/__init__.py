from flask.cli import AppGroup
# from .users import seed_users, undo_users, seed_classes, seed_student_class, seed_rewards, seed_feedback, seed_message_board, seed_posts, seed_post_replies, seed_post_reactions, seed_post_reply_reactions
from .users import seed_data, undo_users

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_data()
    # seed_users()
    # seed_classes()
    # seed_student_class()
    # seed_rewards()
    # seed_feedback()
    # seed_message_board()
    # seed_posts()
    # seed_post_replies()
    # seed_post_reactions()
    # seed_post_reply_reactions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
