from flask import Blueprint
from flask_restful import Api

from app.resources.profile import ProfileResource


profile_bp = Blueprint(
    "profile_bp",
    __name__,
    url_prefix="/api/profile"
)

profile_api = Api(profile_bp)


profile_api.add_resource(
    ProfileResource,
    ""
)
