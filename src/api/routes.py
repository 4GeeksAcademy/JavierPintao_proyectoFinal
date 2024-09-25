"""
This module takes care of starting the API Server, loading the DB, and adding the endpoints.
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Vendedor, Comprador
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/hello33', methods=['POST', 'GET'])
def handle_hello33():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signUp', methods=['POST' ])
def create_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')
    
    
    user_query = User.query.filter_by(email=email).first()
    if user_query:
        return jsonify({"msg": "User already exists"}), 409
     
    else:
        access_token = create_access_token(identity=user_login.id)
        return jsonify({"token": access_token, "user_id": user_login.id}), 200
    
    # Crear usuario
  
    new_user = User(
        email=email,
        password=password,
        is_active=request_body.get('is_active', True)
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')
    user_login = User.query.filter_by(email=request_body['email']).first()
    if user_login is None:
        response_body = {
            "msg": "User does not exist"
        }
        return jsonify(response_body), 404
    elif password != user_login.password:
        response_body = {
            "msg": "Incorrect password"
        }
        return jsonify(response_body), 404
    else:
        access_token = create_access_token(identity=user_login.id)
        return jsonify({"token": access_token, "user_id": user_login.id}), 200


