from flask import Blueprint
from flask_restful import Api

from app.resources.favorite import (
    FavoriteResource,
    FavoriteListResource
)


favorite_bp = Blueprint(
    "favorite_bp",
    __name__,
    url_prefix="/api"
)

favorite_api = Api(favorite_bp)


# Add or remove a property from favorites
favorite_api.add_resource(
    FavoriteResource,
    "/properties/<int:property_id>/favorite"
)


# Get the logged-in user's favorites
favorite_api.add_resource(
    FavoriteListResource,
    "/favorites"
)

