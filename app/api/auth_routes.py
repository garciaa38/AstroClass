from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/demo-login', methods=['POST'])
def demo_login():
    data = request.get_json()
    role = data.get("role")

    if role == 'teacher':
        user = User.query.filter(User.email == 'demoTeacher1@aa.io').first()
        login_user(user)
        return user.to_dict()
    elif role == 'student':
        user = User.query.filter(User.email == 'demoKid1@aa.io').first()
        login_user(user)
        return user.to_dict()
    return jsonify({error: "Something went wrong"})

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    data = request.get_json()
    email = data.get("email")
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    password = data.get("password")
    role = data.get("role")
    suffix = data.get("suffix")
    points = data.get("points")
    phone_number = data.get("phoneNumber")

    user = User (
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        role=role,
        suffix=suffix,
        points=points,
        phone_number=phone_number
    )

    print("NEW USER", user.to_dict())

    db.session.add(user)
    db.session.commit()
    login_user(user)
    return jsonify(user.to_dict())

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401