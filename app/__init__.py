import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, Class, StudentClass, Reward, Feedback, MessageBoard, Post, PostReply, PostReaction, PostReplyReaction
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.class_routes import class_routes
from .api.reward_routes import reward_routes
from .api.student_routes import student_routes
from .api.feedback_routes import feedback_routes
from .api.message_board_routes import message_board_routes
from .api.post_routes import post_routes
from .api.post_reply_routes import post_reply_routes
from .api.post_reaction_routes import post_reaction_routes
from .api.post_reply_reaction_routes import post_reply_reaction_routes
from .seeds import seed_commands
from .config import Config
from flask_socketio import SocketIO, emit, leave_room, join_room

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(class_routes, url_prefix='/api/classes')
app.register_blueprint(reward_routes, url_prefix='/api/rewards')
app.register_blueprint(student_routes, url_prefix='/api/students')
app.register_blueprint(feedback_routes, url_prefix='/api/feedback')
app.register_blueprint(message_board_routes, url_prefix='/api/message-boards')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(post_reply_routes, url_prefix='/api/post-replies')
app.register_blueprint(post_reaction_routes, url_prefix='/api/post-reactions')
app.register_blueprint(post_reply_reaction_routes, url_prefix='/api/post-reply-reactions')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# SocketIO event handlers
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('join_room')
def handle_join_room(data):
    print("JOIN ROOM", data)
    room = data.get('room')
    join_room(room)
    # emit('join_room_announcement', {'message': f'User has joined room {room}'}, room=room)

@socketio.on('leave_room')
def handle_leave_room(data):
    print("LEAVE ROOM", data)
    room = data.get('room')
    leave_room(room)
    # emit('leave_room_announcement', {'message': f'User has left room {room}'}, room=room)

# @socketio.on('class')
# def handle_class(data):
#     print("ENTERED CLASS", data)
#     emit('class', data)

@socketio.on('updateClass')
def handle_class(data):
    try:
        print("UPDATE CLASS", data)
        room = data.get('room')
        print(f"Emitting to room {room}")
        emit('updateClass', data, broadcast=True)
    except Exception as e:
        print(f"Error in updateClass: {e}")

@socketio.on('updateClasses')
def handle_classes(data):
    print("UPDATE CLASSES", data)
    room = data.get('room')
    print(f"Emitting to room {room}")
    emit('updateClasses', data, broadcast=True)

@socketio.on('send_message')
def handle_send_message(data):
    room = data.get('room')
    message = data.get('message')
    emit('receive_message', {'message': message}, room=room)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8000)