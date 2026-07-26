from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models import Favorite, Property


class FavoriteResource(Resource):

    @jwt_required()
    def post(self, property_id):
        user_id = int(get_jwt_identity())

        # Check if property exists
        property = Property.query.get(property_id)

        if not property:
            return {
                "error": "Property not found"
            }, 404

        # Check if already favorited
        existing_favorite = Favorite.query.filter_by(
            user_id=user_id,
            property_id=property_id
        ).first()

        if existing_favorite:
            return {
                "error": "Property is already in your favorites"
            }, 409

        favorite = Favorite(
            user_id=user_id,
            property_id=property_id
        )

        db.session.add(favorite)
        db.session.commit()

        return {
            "message": "Property added to favorites successfully",
            "favorite": {
                "id": favorite.id,
                "user_id": favorite.user_id,
                "property_id": favorite.property_id,
                "created_at": favorite.created_at.isoformat()
            }
        }, 201

    @jwt_required()
    def delete(self, property_id):
        user_id = int(get_jwt_identity())

        favorite = Favorite.query.filter_by(
            user_id=user_id,
            property_id=property_id
        ).first()

        if not favorite:
            return {
                "error": "Property is not in your favorites"
            }, 404

        db.session.delete(favorite)
        db.session.commit()

        return {
            "message": "Property removed from favorites successfully"
        }, 200


class FavoriteListResource(Resource):

    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())

        favorites = Favorite.query.filter_by(
            user_id=user_id
        ).order_by(
            Favorite.created_at.desc()
        ).all()

        return {
            "favorites": [
                {
                    "id": favorite.id,
                    "property_id": favorite.property_id,
                    "created_at": favorite.created_at.isoformat(),
                    "property": {
                        "id": favorite.property.id,
                        "title": favorite.property.title,
                        "description": favorite.property.description,
                        "property_type": favorite.property.property_type,
                        "listing_type": favorite.property.listing_type,
                        "price": float(favorite.property.price),
                        "location": favorite.property.location,
                        "county": favorite.property.county,
                        "bedrooms": favorite.property.bedrooms,
                        "bathrooms": favorite.property.bathrooms,
                        "user_id": favorite.property.user_id
                    }
                }
                for favorite in favorites
            ],
            "total": len(favorites)
        }, 200
