from flask import Blueprint
from flask_restful import Api

from app.resources.dashboard import DashboardStatsResource

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__,
    url_prefix="/api/dashboard"
)

api = Api(dashboard_bp)

api.add_resource(
    DashboardStatsResource,
    "/stats"
)