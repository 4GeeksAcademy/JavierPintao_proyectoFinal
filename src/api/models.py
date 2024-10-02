from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Modelo para los usuarios
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    anuncios = db.relationship('Anuncio', backref='user', lazy=True)
    transactions = db.relationship('Transaction', backref='user', lazy=True)  # Relación con transacciones

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

# Modelo para los anuncios
class Anuncio(db.Model):
    __tablename__ = 'anuncio'

    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(50), nullable=False)
    kilometros = db.Column(db.Integer, nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    descripcion = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Relación con el usuario
    transactions = db.relationship('Transaction', backref='anuncio', lazy=True)  # Relación con transacciones

    def __repr__(self):
        return f'<Anuncio {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "marca": self.marca,
            "kilometros": self.kilometros,
            "ano": self.ano,
            "precio": self.precio,
            "descripcion": self.descripcion,
            "user_id": self.user_id
        }

# Modelo para las transacciones (pagos)
class Transaction(db.Model):
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.String(120), unique=True, nullable=False)  # ID de la transacción de PayPal
    amount = db.Column(db.Float, nullable=False)  # Monto pagado
    currency = db.Column(db.String(10), nullable=False)  # Moneda de la transacción (ej. USD)
    status = db.Column(db.String(20), nullable=False)  # Estado del pago (ej. 'COMPLETED', 'PENDING')
    anuncio_id = db.Column(db.Integer, db.ForeignKey('anuncio.id'), nullable=False)  # Relación con el anuncio
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Relación con el usuario

    def __repr__(self):
        return f'<Transaction {self.transaction_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "transaction_id": self.transaction_id,
            "amount": self.amount,
            "currency": self.currency,
            "status": self.status,
            "anuncio_id": self.anuncio_id,
            "user_id": self.user_id
        }
