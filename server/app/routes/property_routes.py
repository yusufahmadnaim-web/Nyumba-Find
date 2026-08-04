from flask import Blueprint
from flask_restful import Api

from app.resources.property import (
    PropertyListResource,
    MyPropertiesResource,
    PropertyResource,
    PropertyImageResource,
)

property_bp = Blueprint(
    "property_bp",
    __name__,
    url_prefix="/api/properties"
)

property_api = Api(property_bp)

property_api.add_resource(
    PropertyListResource,
    ""
)

property_api.add_resource(
    MyPropertiesResource,
    "/my-properties"
)

property_api.add_resource(
    PropertyResource,
    "/<int:property_id>"
)

property_api.add_resource(
    PropertyImageResource,
    "/<int:property_id>/images",
    "/<int:property_id>/images/<int:image_id>"
)