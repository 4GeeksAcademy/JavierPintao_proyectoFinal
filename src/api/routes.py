"""
This module takes care of starting the API Server, loading the DB, and adding the endpoints.
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/vende/register', methods=['POST'])
def create_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')
    
    # Check if user already exists
    user_query = User.query.filter_by(email=email).first()
    if user_query:
        return jsonify({"msg": "User already exists"}), 409
    
    # Create new user with hashed password
    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(
        name=request_body.get('name'),
        email=email,
        password=hashed_password,
        is_active=request_body.get('is_active', True)
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/vende/login', methods=['POST'])
def login_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User does not exist"}), 404
    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Incorrect password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200
