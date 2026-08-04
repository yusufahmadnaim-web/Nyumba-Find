import os

from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

from app import db
from app.models import Property, PropertyImage


class UploadImageResource(Resource):

    @jwt_required()
    def post(self, property_id):
        user_id = int(get_jwt_identity())

        property = Property.query.get_or_404(property_id)

        if property.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        if "image" not in request.files:
            return {"error": "No image uploaded"}, 400

        image = request.files["image"]

        if image.filename == "":
            return {"error": "Invalid image"}, 400

        filename = secure_filename(image.filename)

        upload_folder = current_app.config["UPLOAD_FOLDER"]

        os.makedirs(upload_folder, exist_ok=True)

        filepath = os.path.join(upload_folder, filename)

        image.save(filepath)

        property_image = PropertyImage(
            image_url=f"/uploads/{filename}",
            property_id=property.id,
        )

        db.session.add(property_image)
        db.session.commit()

        return {
            "message": "Image uploaded successfully",
            "image": {
                "id": property_image.id,
                "image_url": property_image.image_url,
            },
        }, 201


class PropertyImagesResource(Resource):

    def get(self, property_id):
        property = Property.query.get_or_404(property_id)

        return {
            "images": [
                {
                    "id": image.id,
                    "image_url": image.image_url,
                }
                for image in property.images
            ]
        }, 200


class DeleteImageResource(Resource):

    @jwt_required()
    def delete(self, image_id):
        user_id = int(get_jwt_identity())

        image = PropertyImage.query.get_or_404(image_id)

        if image.property.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        filepath = os.path.join(
            current_app.config["UPLOAD_FOLDER"],
            os.path.basename(image.image_url),
        )

        if os.path.exists(filepath):
            os.remove(filepath)

        db.session.delete(image)
        db.session.commit()

        return {
            "message": "Image deleted successfully"
        }, 200