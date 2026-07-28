


from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

class MeResource(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()

        user = User.query.get(user_id)

        if not user:
            return {
                "error": "User not found"
            }, 404

        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }, 200
    