from datetime import datetime

from app import db


class Property(db.Model):
    __tablename__ = "properties"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(150),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    property_type = db.Column(
        db.String(50),
        nullable=False
    )

    listing_type = db.Column(
        db.String(50),
        nullable=False
    )

    price = db.Column(
        db.Numeric(12, 2),
        nullable=False
    )


    location = db.Column(
        db.String(150),
        nullable=False
    )

    county = db.Column(
        db.String(100),
        nullable=False
    )

    bedrooms = db.Column(
        db.Integer,
        nullable=False
    )

    bathrooms = db.Column(
        db.Integer,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    user = db.relationship(
        "User",
        backref=db.backref(
            "properties",
            lazy=True,
            cascade="all, delete-orphan"
        )
    )
