from flask import Blueprint
from flask_restful import Api

from app.resources.auth import (
    RegisterResource,
    LoginResource,
    MeResource
)


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)

auth_api = Api(auth_bp)


auth_api.add_resource(
    RegisterResource,
    "/register"
)

auth_api.add_resource(
    LoginResource,
    "/login"
)

auth_api.add_resource(
    MeResource,
    "/me"
)