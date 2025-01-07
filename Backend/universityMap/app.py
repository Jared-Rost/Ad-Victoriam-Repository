from datetime import datetime

from flask import Flask, request, redirect, session, url_for, jsonify, Response, make_response

from sqlalchemy import create_engine

from database import db, User, Session, Log, Alert
from dictionary import auth0_manager_token, CLIENT_ID, CLIENT_SECRET, API_AUDIENCE

import requests
import json
from flask_cors import CORS, cross_origin  # Import CORS extension

from utils import validate_token

AUTH0_DOMAIN = 'dev-htyfpjzs.us.auth0.com'

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

#API_AUDIENCE = "https://dev-htyfpjzs.us.auth0.com/api/v2/"

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/postgres_db'
app.config['CORS_HEADERS'] = 'Content-Type'

db.app = app
db.init_app(app)


@app.route('/home')
def hello_world():
    return 'Hello World!'

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            login_url = 'https://dev-htyfpjzs.us.auth0.com/oauth/token'

            print(request.data)

            username = request.json.get('username')
            password = request.json.get('password')

            if username is None or password is None:
                return "Missing username or password", 400

            print(username, password)

            payload = {
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'audience': API_AUDIENCE,
                'grant_type': 'password',
                'username': username,
                'password': password
            }
            headers = {'Content-Type': 'application/json'}
            response = requests.post(login_url, json=payload, headers=headers)

            if response.status_code == 200:
                access_token = response.json().get('access_token')
                user = User.query.filter_by(username=username).first()
                if user:
                    user.access_token = access_token
                    new_session = Session(userID=user.userID,
                                          timeCreated=datetime.now())
                    db.session.add(new_session)
                    db.session.commit()

                data = {
                    "access_token": access_token,
                    "user_id": user.userID,
                    "username": user.username,
                }

                print("returnData", data)

                return data, 200
            else:
                print(f"Login failed: {response.text}")
                return "Login Failed", 401
        except Exception as e:
            print(f"Server error: {e}")
            return "Login Failed", 401


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        register_url = "https://dev-htyfpjzs.us.auth0.com/api/v2/users"

        username = request.json.get('username')
        password = request.json.get('password')

        role = request.json.get('role')

        print(username, password, role)

        email = f"ouremail_+{username}@example.com"

        if username is None or password is None:
            return "Missing username or password", 400

        print(username, password)

        payload = json.dumps({
            "email": email,
            "username": username,
            "password": password,
            "given_name": "John",
            "family_name": "Doe",
            "nickname": "JD",
            "connection": "Username-Password-Authentication"
        })
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {auth0_manager_token}',
        }

        response = requests.request("POST", register_url, headers=headers, data=payload)

        print(response.text)

        if response.status_code == 201:
            new_user = User(username=username, email=email, role=role)
            db.session.add(new_user)
            db.session.commit()

            return 'User registered successfully'
        else:
            return 'Failed to register user'

@app.route('/verify-token', methods=['POST'])
def verify_token():
    token = request.json.get('token')
    if not token:
        return 'Token is missing', 400

    # Validate the token
    result = validate_token(token)
    if result[0]:
        return "Failed", 401

    return "Verified", 200

# figure out JWKS public key verification later
'''
def get_public_key(kid):
    # Fetch JWKS (JSON Web Key Set) from Auth0's JWKS endpoint
    jwks_url = 'https://your-auth0-tenant.auth0.com/.well-known/jwks.json'
    response = requests.get(jwks_url)
    jwks = response.json()

    # Find the correct key based on the 'kid' (Key ID)
    keys = {key['kid']: key for key in jwks['keys']}
    public_key = keys[kid]

    return jwt.algorithms.RSAAlgorithm.from_jwk(public_key)
'''
@app.route('/logout', methods=['POST'])
def logout():
    if request.method == 'POST':
        token = request.form.get('token')

        token_validity = validate_token(token)
        print(token_validity)

        if token_validity[0]:
            sessions = Session.query.join(User).filter(User.access_token == token).all()
            user = User.query.filter_by(access_token=token).first()

            # Delete the sessions
            for session in sessions:
                db.session.delete(session)

            if user is None:
                return "Invalid token, likely empty", 401

            user.access_token = None



            db.session.commit()

            return "Logged out successfully", 200
        else:
            return "Invalid token", 401


with app.app_context():
    db.create_all()

    users = User.query.all()
    print(users)

app.run()

