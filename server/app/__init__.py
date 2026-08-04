from flask import Flask, app, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    from app.routes.admin_routes import admin_bp
    app.register_blueprint(admin_bp)



    from app.routes.dashboard_routes import dashboard_bp

    app.register_blueprint(dashboard_bp)



    # Register authentication routes
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    # Register favorite routes
    from app.routes.favorite_routes import favorite_bp
    app.register_blueprint(favorite_bp)

    # Register property routes
    from app.routes.property_routes import property_bp
    app.register_blueprint(property_bp)

    # Register profile routes
    from app.routes.profile_routes import profile_bp
    app.register_blueprint(profile_bp)

    # Serve uploaded property images
    @app.route("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory(
            app.root_path + "/uploads",
            filename
        )

    return app
