from app import db


class PropertyImage(db.Model):
    __tablename__ = "property_images"

    id = db.Column(db.Integer, primary_key=True)

    image_url = db.Column(
        db.String(500),
        nullable=False
    )

    property_id = db.Column(
        db.Integer,
        db.ForeignKey("properties.id"),
        nullable=False
    )

    property = db.relationship(
        "Property",
        backref=db.backref(
            "images",
            lazy=True,
            cascade="all, delete-orphan"
        )
    )