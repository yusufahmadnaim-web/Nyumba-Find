import os

from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

from app import db
from app.models import Property, PropertyImage
from app.models.user import User

class PropertyListResource(Resource):

    # ==========================================
    # GET ALL PROPERTIES
    # SEARCH + FILTER + PAGINATION
    # ==========================================
    def get(self):
        query = Property.query

        # --------------------------
        # SEARCH
        # --------------------------
        search = request.args.get("search")

        if search:
            search_term = f"%{search}%"

            query = query.filter(
                db.or_(
                    Property.title.ilike(search_term),
                    Property.description.ilike(search_term),
                    Property.location.ilike(search_term),
                    Property.county.ilike(search_term)
                )
            )

        # --------------------------
        # FILTERING
        # --------------------------
        county = request.args.get("county")
        location = request.args.get("location")
        property_type = request.args.get("property_type")
        listing_type = request.args.get("listing_type")
        bedrooms = request.args.get("bedrooms")
        min_price = request.args.get("min_price")
        max_price = request.args.get("max_price")

        # County
        if county:
            query = query.filter(
                Property.county.ilike(f"%{county}%")
            )

        # Location
        if location:
            query = query.filter(
                Property.location.ilike(f"%{location}%")
            )

        # Property type
        if property_type:
            query = query.filter(
                Property.property_type.ilike(f"%{property_type}%")
            )

        # Listing type
        if listing_type:
            query = query.filter(
                Property.listing_type.ilike(f"%{listing_type}%")
            )

        # Bedrooms
        if bedrooms:
            try:
                query = query.filter(
                    Property.bedrooms == int(bedrooms)
                )
            except ValueError:
                return {
                    "error": "bedrooms must be a valid number"
                }, 400

        # Minimum price
        if min_price:
            try:
                query = query.filter(
                    Property.price >= float(min_price)
                )
            except ValueError:
                return {
                    "error": "min_price must be a valid number"
                }, 400

        # Maximum price
        if max_price:
            try:
                query = query.filter(
                    Property.price <= float(max_price)
                )
            except ValueError:
                return {
                    "error": "max_price must be a valid number"
                }, 400

        # --------------------------
        # PAGINATION
        # --------------------------
        page = request.args.get(
            "page",
            1,
            type=int
        )

        per_page = request.args.get(
            "per_page",
            10,
            type=int
        )

        # Prevent invalid page
        if page < 1:
            page = 1

        # Prevent invalid per_page
        if per_page < 1:
            per_page = 10

        # Maximum items per page
        if per_page > 100:
            per_page = 100

        pagination = query.order_by(
            Property.created_at.desc()
        ).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

        # --------------------------
        # RESPONSE
        # --------------------------
        return {
            "properties": [
                {
                    "id": property.id,
                    "title": property.title,
                    "description": property.description,
                    "property_type": property.property_type,
                    "listing_type": property.listing_type,
                    "price": float(property.price),
                    "location": property.location,
                    "county": property.county,
                    "bedrooms": property.bedrooms,
                    "bathrooms": property.bathrooms,
                    "user_id": property.user_id,
                    "created_at": property.created_at.isoformat(),
                    "updated_at": property.updated_at.isoformat(),

                    "images": [
                        {
                            "id": image.id,
                            "image_url": image.image_url
                        }
                        for image in property.images
                    ]
                }
                for property in pagination.items
            ],

            "pagination": {
                "page": pagination.page,
                "per_page": pagination.per_page,
                "total": pagination.total,
                "pages": pagination.pages,
                "has_next": pagination.has_next,
                "has_previous": pagination.has_prev
            }
        }, 200

    # ==========================================
    # CREATE PROPERTY
    # ==========================================
    @jwt_required()
    def post(self):
        data = request.get_json()

        if not data:
            return {
                "error": "Request body is required"
            }, 400

        required_fields = [
            "title",
            "description",
            "property_type",
            "listing_type",
            "price",
            "location",
            "county",
            "bedrooms",
            "bathrooms"
        ]

        for field in required_fields:
            if field not in data:
                return {
                    "error": f"{field} is required"
                }, 400

        user_id = get_jwt_identity()

        property = Property(
            title=data["title"],
            description=data["description"],
            property_type=data["property_type"],
            listing_type=data["listing_type"],
            price=data["price"],
            location=data["location"],
            county=data["county"],
            bedrooms=data["bedrooms"],
            bathrooms=data["bathrooms"],
            user_id=int(user_id)
        )

        db.session.add(property)
        db.session.commit()

        return {
            "message": "Property created successfully",

            "property": {
                "id": property.id,
                "title": property.title,
                "description": property.description,
                "property_type": property.property_type,
                "listing_type": property.listing_type,
                "price": float(property.price),
                "location": property.location,
                "county": property.county,
                "bedrooms": property.bedrooms,
                "bathrooms": property.bathrooms,
                "user_id": property.user_id,
                "created_at": property.created_at.isoformat(),
                "images": []
            }
        }, 201

    # ==========================================
    # UPDATE PROPERTY
    # ==========================================
    @jwt_required()
    def patch(self, property_id):
        property = Property.query.get(property_id)

        if not property:
            return {
                "error": "Property not found"
            }, 404

        current_user_id = int(get_jwt_identity())
        current_user = User.query.get(current_user_id)

        if not current_user:
              return {
        "error": "User not found"
    }, 404

        if property.user_id != current_user_id and current_user.role != "admin":
               return {
        "error": "You are not authorized to update this property"
    }, 403

        data = request.get_json()

        if not data:
            return {
                "error": "Request body is required"
            }, 400

        allowed_fields = [
            "title",
            "description",
            "property_type",
            "listing_type",
            "price",
            "location",
            "county",
            "bedrooms",
            "bathrooms"
        ]

        for field in allowed_fields:
            if field in data:
                setattr(
                    property,
                    field,
                    data[field]
                )

        db.session.commit()

        return {
            "message": "Property updated successfully",

            "property": {
                "id": property.id,
                "title": property.title,
                "description": property.description,
                "property_type": property.property_type,
                "listing_type": property.listing_type,
                "price": float(property.price),
                "location": property.location,
                "county": property.county,
                "bedrooms": property.bedrooms,
                "bathrooms": property.bathrooms,
                "user_id": property.user_id,
                "updated_at": property.updated_at.isoformat(),

                "images": [
                    {
                        "id": image.id,
                        "image_url": image.image_url
                    }
                    for image in property.images
                ]
            }
        }, 200

    # ==========================================
    # DELETE PROPERTY
    # ==========================================
    @jwt_required()
    def delete(self, property_id):
        property = Property.query.get(property_id)

        current_user_id = int(get_jwt_identity())
        current_user = User.query.get(current_user_id)

        if not current_user:
            return {
                "error": "User not found"
            }, 404

        if property.user_id != current_user_id and current_user.role != "admin":
            return {
                "error": "You are not authorized to delete this property"
            }, 403

        db.session.delete(property)
        db.session.commit()

        return {
            "message": "Property deleted successfully"
        }, 200

class MyPropertiesResource(Resource):

    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())

        properties = (
            Property.query
            .filter_by(user_id=user_id)
            .order_by(Property.created_at.desc())
            .all()
        )

        return {
            "properties": [
                {
                    "id": property.id,
                    "title": property.title,
                    "description": property.description,
                    "property_type": property.property_type,
                    "listing_type": property.listing_type,
                    "price": float(property.price),
                    "location": property.location,
                    "county": property.county,
                    "bedrooms": property.bedrooms,
                    "bathrooms": property.bathrooms,
                    "user_id": property.user_id,
                    "created_at": property.created_at.isoformat(),
                    "updated_at": property.updated_at.isoformat(),

                    "images": [
                        {
                            "id": image.id,
                            "image_url": image.image_url
                        }
                        for image in property.images
                    ]
                }
                for property in properties
            ]
        }, 200


class PropertyResource(Resource):


     @jwt_required()
     def delete(self, property_id):
            property = Property.query.get(property_id)
    
            current_user_id = int(get_jwt_identity())
            current_user = User.query.get(current_user_id)
    
            if not current_user:
                return {
                    "error": "User not found"
                }, 404
    
            if property.user_id != current_user_id and current_user.role != "admin":
                return {
                    "error": "You are not authorized to delete this property"
                }, 403
    
            db.session.delete(property)
            db.session.commit()
    
            return {
                "message": "Property deleted successfully"
            }, 200

            @jwt_required()
            def patch(self, property_id):
             property = Property.query.get(property_id)
    
            if not property:
                return {
                    "error": "Property not found"
                }, 404
    
            current_user_id = int(get_jwt_identity())
            current_user = User.query.get(current_user_id)
    
            if not current_user:
                  return {
            "error": "User not found"
        }, 404
    
            if property.user_id != current_user_id and current_user.role != "admin":
                   return {
            "error": "You are not authorized to update this property"
        }, 403
    
            data = request.get_json()
    
            if not data:
                return {
                    "error": "Request body is required"
                }, 400
    
            allowed_fields = [
                "title",
                "description",
                "property_type",
                "listing_type",
                "price",
                "location",
                "county",
                "bedrooms",
                "bathrooms"
            ]
    
            for field in allowed_fields:
                if field in data:
                    setattr(
                        property,
                        field,
                        data[field]
                    )
    
            db.session.commit()
    
            return {
                "message": "Property updated successfully",
    
                "property": {
                    "id": property.id,
                    "title": property.title,
                    "description": property.description,
                    "property_type": property.property_type,
                    "listing_type": property.listing_type,
                    "price": float(property.price),
                    "location": property.location,
                    "county": property.county,
                    "bedrooms": property.bedrooms,
                    "bathrooms": property.bathrooms,
                    "user_id": property.user_id,
                    "updated_at": property.updated_at.isoformat(),
    
                    "images": [
                        {
                            "id": image.id,
                            "image_url": image.image_url
                        }
                        for image in property.images
                    ]
                }
            }, 200



     def get(self, property_id):
        property = Property.query.get(property_id)

        if not property:
            return {"error": "Property not found"}, 404

        return {
            "property": {
                "id": property.id,
                "title": property.title,
                "description": property.description,
                "property_type": property.property_type,
                "listing_type": property.listing_type,
                "price": float(property.price),
                "location": property.location,
                "county": property.county,
                "bedrooms": property.bedrooms,
                "bathrooms": property.bathrooms,
                "user_id": property.user_id,
                "created_at": property.created_at.isoformat(),
                "updated_at": property.updated_at.isoformat(),
                "images": [
                    {
                        "id": image.id,
                        "image_url": image.image_url,
                    }
                    for image in property.images
                ],
            }
        }, 200
class PropertyImageResource(Resource):

    # ==========================================
    # UPLOAD PROPERTY IMAGE
    # ==========================================
    @jwt_required()
    def post(self, property_id):

        property = Property.query.get(property_id)

        if not property:
            return {
                "error": "Property not found"
            }, 404

        current_user_id = int(get_jwt_identity())

        if property.user_id != current_user_id:
            return {
                "error": "You are not authorized to add images to this property"
            }, 403

        if "image" not in request.files:
            return {
                "error": "Image file is required"
            }, 400

        image = request.files["image"]

        if image.filename == "":
            return {
                "error": "No image selected"
            }, 400

        filename = secure_filename(image.filename)

        upload_folder = os.path.join(
            current_app.root_path,
            "uploads"
        )

        os.makedirs(
            upload_folder,
            exist_ok=True
        )

        image_path = os.path.join(
            upload_folder,
            filename
        )

        image.save(image_path)

        property_image = PropertyImage(
            image_url=f"/uploads/{filename}",
            property_id=property.id
        )

        db.session.add(property_image)
        db.session.commit()

        return {
            "message": "Property image uploaded successfully",
            "image": {
                "id": property_image.id,
                "image_url": property_image.image_url,
                "property_id": property.id
            }
        }, 201

    # ==========================================
    # DELETE PROPERTY IMAGE
    # ==========================================
    @jwt_required()
    def delete(self, property_id, image_id):

        property = Property.query.get(property_id)

        if not property:
            return {
                "error": "Property not found"
            }, 404

        current_user_id = int(get_jwt_identity())

        if property.user_id != current_user_id:
            return {
                "error": "You are not authorized to delete images from this property"
            }, 403

        image = PropertyImage.query.filter_by(
            id=image_id,
            property_id=property_id
        ).first()

        if not image:
            return {
                "error": "Image not found"
            }, 404

        image_path = os.path.join(
            current_app.root_path,
            image.image_url.lstrip("/")
        )

        if os.path.exists(image_path):
            os.remove(image_path)

        db.session.delete(image)
        db.session.commit()

        return {
            "message": "Image deleted successfully"
        }, 200