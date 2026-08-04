from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from app import db
from app.models import User, Profile


# ==========================================
# REGISTER
# ==========================================
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


# ==========================================
# LOGIN
# ==========================================
class LoginResource(Resource):

    def post(self):
        data = request.get_json()

        print("LOGIN DATA:", data)

        email = data.get("email")
        password = data.get("password")

        print("EMAIL:", email)

        if not email or not password:
            return {
                "error": "Email and password are required"
            }, 400

        user = User.query.filter_by(email=email).first()

        print("USER FOUND:", user)

        if user:
            print("PASSWORD VALID:", user.check_password(password))

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


# ==========================================
# CURRENT USER
# ==========================================
class MeResource(Resource):

    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())

        user = User.query.get(user_id)

        if not user:
            return {
                "error": "User not found"
            }, 404

        properties = []

        for property in user.properties:
            properties.append({
                "id": property.id,
                "title": property.title,
                "description": property.description,
                "property_type": property.property_type,
                "listing_type": property.listing_type,
                "price": float(property.price),
                "location": property.location,
                "county": property.county,
                "bedrooms": property.bedrooms,
                "bathrooms": property.bathrooms,
                "images": [
                    {
                        "id": image.id,
                        "image_url": image.image_url
                    }
                    for image in property.images
                ]
            })

        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            },
            "stats": {
                "properties": len(properties)
            },
            "properties": properties
        }, 200