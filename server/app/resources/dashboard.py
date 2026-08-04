from flask_restful import Resource
from flask_jwt_extended import jwt_required
from sqlalchemy import func

from app import db
from app.models.user import User
from app.models.property import Property
from app.models.favorite import Favorite

class DashboardStatsResource(Resource):

    @jwt_required()
    def get(self):

        return {
            "users": User.query.count(),
            "properties": Property.query.count(),
            "favorites": Favorite.query.count(),

            "rentals": Property.query.filter_by(
                listing_type="Rent"
            ).count(),

            "sales": Property.query.filter_by(
                listing_type="Sale"
            ).count(),

            "average_price": float(
                db.session.query(
                    func.avg(Property.price)
                ).scalar() or 0
            )
        }, 200