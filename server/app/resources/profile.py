from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models import User, Profile, Favorite


class ProfileResource(Resource):

    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())

        user = User.query.get(user_id)

        if not user:
            return {
                "error": "User not found"
            }, 404

        profile = Profile.query.filter_by(
            user_id=user_id
        ).first()

        if not profile:
            return {
                "error": "Profile not found"
            }, 404

        properties = user.properties

        property_count = len(properties)

        favorite_count = Favorite.query.filter_by(
            user_id=user_id
        ).count()

        image_count = sum(
            len(property.images)
            for property in properties
        )

        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,

                "profile": {
                    "id": profile.id,
                    "first_name": profile.first_name,
                    "last_name": profile.last_name,
                    "phone_number": profile.phone_number,
                    "bio": profile.bio
                },

                "statistics": {
                    "properties": property_count,
                    "favorites": favorite_count,
                    "images": image_count
                },

                "properties": [
                    {
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
                    }
                    for property in properties
                ]
            }
        }, 200

    @jwt_required()
    def patch(self):
        user_id = int(get_jwt_identity())

        user = User.query.get(user_id)

        if not user:
            return {
                "error": "User not found"
            }, 404

        profile = Profile.query.filter_by(
            user_id=user_id
        ).first()

        if not profile:
            return {
                "error": "Profile not found"
            }, 404

        data = request.get_json()

        allowed_fields = [
            "first_name",
            "last_name",
            "phone_number",
            "bio"
        ]

        for field in allowed_fields:
            if field in data:
                setattr(profile, field, data[field])

        db.session.commit()

        return {
            "message": "Profile updated successfully",
            "profile": {
                "id": profile.id,
                "first_name": profile.first_name,
                "last_name": profile.last_name,
                "phone_number": profile.phone_number,
                "bio": profile.bio,
                "user_id": profile.user_id,
                "username": user.username,
                "email": user.email
            }
        }, 200