from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models.user import User
from app.models.property import Property
from app.models.property_image import PropertyImage
from app.models.favorite import Favorite

from app.utils.admin_required import admin_required


# ==========================================
# ADMIN DASHBOARD
# ==========================================
class AdminDashboardResource(Resource):

    @jwt_required()
    @admin_required
    def get(self):

        return {
            "statistics": {
                "total_users": User.query.count(),
                "total_properties": Property.query.count(),
                "total_images": PropertyImage.query.count(),
                "total_favorites": Favorite.query.count(),
            }
        }, 200


# ==========================================
# ALL USERS
# ==========================================
class AdminUsersResource(Resource):

    @jwt_required()
    @admin_required
    def get(self):

        users = User.query.order_by(User.id.asc()).all()

        return {
            "users": [
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }
                for user in users
            ]
        }, 200


# ==========================================
# UPDATE USER ROLE
# DELETE USER
# ==========================================
class AdminUserResource(Resource):

    @jwt_required()
    @admin_required
    def patch(self, user_id):

        user = User.query.get(user_id)

        if not user:
            return {"error": "User not found"}, 404

        from flask import request
        data = request.get_json()

        role = data.get("role")

        if role not in ["user", "admin"]:
            return {"error": "Invalid role"}, 400

        user.role = role

        db.session.commit()

        return {
            "message": "User updated successfully"
        }, 200

    @jwt_required()
    @admin_required
    def delete(self, user_id):

        current_user = int(get_jwt_identity())

        if current_user == user_id:
            return {
                "error": "You cannot delete yourself."
            }, 400

        user = User.query.get(user_id)

        if not user:
            return {
                "error": "User not found"
            }, 404

        db.session.delete(user)
        db.session.commit()

        return {
            "message": "User deleted successfully"
        }, 200