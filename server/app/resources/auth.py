from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from app import db
from app.models import User, Profile


class RegisterResource(Resource):

    def post(self):
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return {
                "error": "Username, email, and password are required"
            }, 400

        existing_user = User.query.filter(
            (User.username == username) |
            (User.email == email)
        ).first()

        if existing_user:
            return {
                "error": "Username or email already exists"
            }, 409

        user = User(
            username=username,
            email=email,
            role="user"
        )

        user.set_password(password)

        db.session.add(user)
        db.session.flush()

        profile = Profile(
            user_id=user.id
        )

        db.session.add(profile)
        db.session.commit()

        return {
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }, 201


class LoginResource(Resource):

    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {
                "error": "Email and password are required"
            }, 400

        user = User.query.filter_by(
            email=email
        ).first()

        if not user or not user.check_password(password):
            return {
                "error": "Invalid email or password"
            }, 401

        access_token = create_access_token(
            identity=str(user.id)
        )

        return {
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }, 200