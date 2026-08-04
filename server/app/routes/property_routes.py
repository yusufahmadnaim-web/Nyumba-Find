from flask import Blueprint
from flask_restful import Api

from app.resources.property import (
    PropertyListResource,
    MyPropertiesResource,
    PropertyResource,
)

from app.resources.property_image import (
    UploadImageResource,
    PropertyImagesResource,
    DeleteImageResource,
)

property_bp = Blueprint(
    "property_bp",
    __name__,
    url_prefix="/api/properties"
)

property_api = Api(property_bp)

# ======================================
# Properties
# ======================================

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

# ======================================
# Property Images
# ======================================

property_api.add_resource(
    UploadImageResource,
    "/<int:property_id>/images/upload"
)

property_api.add_resource(
    PropertyImagesResource,
    "/<int:property_id>/images"
)

property_api.add_resource(
    DeleteImageResource,
    "/images/<int:image_id>"
)