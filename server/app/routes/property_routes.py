
from flask import Blueprint
from flask_restful import Api

from app.resources.property import (
    PropertyListResource,
    PropertyResource,
    PropertyImageResource
)


property_bp = Blueprint(
    "property_bp",
    __name__,
    url_prefix="/api/properties"
)

property_api = Api(property_bp)


# GET /api/properties
# POST /api/properties
property_api.add_resource(
    PropertyListResource,
    ""
)


# GET /api/properties/<property_id>
# PATCH /api/properties/<property_id>
# DELETE /api/properties/<property_id>
property_api.add_resource(
    PropertyResource,
    "/<int:property_id>"
)


# POST /api/properties/<property_id>/images
property_api.add_resource(
    PropertyImageResource,
    "/<int:property_id>/images"
)
