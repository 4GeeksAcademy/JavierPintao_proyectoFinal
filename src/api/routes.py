"""
This module takes care of starting the API Server, loading the DB, and adding the endpoints.
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Anuncio
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
import stripe




api = Blueprint('api', __name__)
stripe.api_key = 'sk_test_51Q6DIjGHhOGXPg6q0w4LRdhQuGyBOmpjqWSLNZI3ZslqrFi8w1IyQrOPo1V0lrVsx8ptgSmdBtGtYrrjrEdi2Ext00S2gyDnep'
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
    
    # Crear usuario
    new_user = User(
        email=email,
        password=password
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')
    if not email or not password:
        return jsonify({"msg" : "todos los campos son requeridos"})
    user_login = User.query.filter_by(email=email, password=password).first()
    if not user_login:
        return jsonify({"msg" : "email y password incorrecto"}), 401
    token = create_access_token(identity = user_login.id)
    return jsonify({"token" : token})



#  crear un anuncio
@api.route('/anuncios', methods=['POST'])
@jwt_required()
def crear_anuncio():
    request_body = request.json
    marca = request_body.get('marca')
    kilometros = request_body.get('kilometros')
    ano = request_body.get('ano')
    precio = request_body.get('precio')
    descripcion = request_body.get('descripcion')
    user_id = get_jwt_identity()  # Obtener el ID del usuario autenticado

    nuevo_anuncio = Anuncio(
        marca=marca,
        kilometros=kilometros,
        ano=ano,
        precio=precio,
        descripcion=descripcion,
        user_id=user_id
    )
    db.session.add(nuevo_anuncio)
    db.session.commit()

    return jsonify({"msg": "Anuncio creado con éxito", "anuncio": nuevo_anuncio.id}), 201

# obtiene todos los anuncios
@api.route('/anuncios', methods=['GET'])
def obtener_anuncios():
    anuncios = Anuncio.query.all()
    return jsonify([{
        "id": anuncio.id,
        "marca": anuncio.marca,
        "kilometros": anuncio.kilometros,
        "ano": anuncio.ano,
        "precio": anuncio.precio,
        "descripcion": anuncio.descripcion,
        "user_id": anuncio.user_id
    } for anuncio in anuncios]), 200

#obtiene los  anuncios de un usuario
@api.route('/mis_anuncios', methods=['GET'])
@jwt_required()
def obtener_mis_anuncios():
    user_id = get_jwt_identity()  # Obtener el ID del usuario autenticado
    anuncios = Anuncio.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": anuncio.id,
        "marca": anuncio.marca,
        "kilometros": anuncio.kilometros,
        "ano": anuncio.ano,
        "precio": anuncio.precio,
        "descripcion": anuncio.descripcion,
    } for anuncio in anuncios]), 200

#editar un anuncio de un id
@api.route('/anuncios/<int:anuncio_id>', methods=['PUT'])
@jwt_required()
def actualizar_anuncio(anuncio_id):
    request_body = request.json
    anuncio = Anuncio.query.get(anuncio_id)

    if not anuncio:
        return jsonify({"msg": "Anuncio no encontrado"}), 404

    user_id = get_jwt_identity()
    if anuncio.user_id != user_id:
        return jsonify({"msg": "No tienes permiso para modificar este anuncio"}), 403

    # Actualizar los campos del anuncio
    anuncio.marca = request_body.get('marca', anuncio.marca)
    anuncio.kilometros = request_body.get('kilometros', anuncio.kilometros)
    anuncio.ano = request_body.get('ano', anuncio.ano)
    anuncio.precio = request_body.get('precio', anuncio.precio)
    anuncio.descripcion = request_body.get('descripcion', anuncio.descripcion)

    db.session.commit()
    return jsonify({"msg": "Anuncio actualizado con éxito"}), 200

# eliminar un anuncio de un id
@api.route('/anuncios/<int:anuncio_id>', methods=['DELETE'])
@jwt_required()
def eliminar_anuncio(anuncio_id):
    anuncio = Anuncio.query.get(anuncio_id)

    if not anuncio:
        return jsonify({"msg": "Anuncio no encontrado"}), 404

    user_id = get_jwt_identity()
    if anuncio.user_id != user_id:
        return jsonify({"msg": "No tienes permiso para eliminar este anuncio"}), 403

    db.session.delete(anuncio)
    db.session.commit()
    return jsonify({"msg": "Anuncio eliminado con éxito"}), 200

@api.route('/create-payment', methods=['POST'])
def create_payment():
    try:
        data = request.json
        intent = stripe.PaymentIntent.create(
            amount=data['amount'],
            currency=data['currency'],
            automatic_payment_methods={
                'enabled': True
            }

        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


        
