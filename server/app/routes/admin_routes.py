from flask import Blueprint
from flask_restful import Api

from app.resources.admin import (
    AdminDashboardResource,
    AdminUsersResource,
    AdminUserResource,
)

admin_bp = Blueprint(
    "admin_bp",
    __name__,
    url_prefix="/api/admin"
)

admin_api = Api(admin_bp)

# Dashboard
admin_api.add_resource(
    AdminDashboardResource,
    "/dashboard"
)

# All users
admin_api.add_resource(
    AdminUsersResource,
    "/users"
)

# Update role and delete user
admin_api.add_resource(
    AdminUserResource,
    "/users/<int:user_id>"
)