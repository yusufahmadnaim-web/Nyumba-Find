from functools import wraps
from flask_jwt_extended import get_jwt_identity
from flask_restful import abort
from app.models.user import User


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = int(get_jwt_identity())
        print("JWT Identity:", user_id)

        user = User.query.get(user_id)
        print("User:", user)
        print("Role:", user.role if user else None)

        if not user:
            abort(404, message="User not found")

        if user.role != "admin":
            abort(403, message="Admin access required")

        return fn(*args, **kwargs)

    return wrapper