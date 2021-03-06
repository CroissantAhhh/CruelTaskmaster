from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Environment
import random
import string

environment_routes = Blueprint('environments', __name__)

banners = [
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971507/banners/banner3_vk9nby.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971507/banners/banner9_mqqi9h.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971508/banners/banner4_d0fyne.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971508/banners/banner2_neeaxg.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971505/banners/banner7_w8fa6i.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971505/banners/banner5_cxud1a.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971506/banners/banner10_wa6vc6.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971504/banners/banner6_bdksig.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971504/banners/banner8_buf9zs.jpg",
    ]

def generate_hash_id():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

@environment_routes.route('/byUser/<int:user_id>')
@login_required
def user_environments(user_id):
    environments = Environment.query.filter(Environment.user_id == user_id).all()
    return {'environments': [env.to_dict() for env in environments]}


@environment_routes.route('/', methods=['POST'])
@login_required
def post_environment():
    data = request.json
    environment = Environment(
        user_id = data["userId"],
        hashed_id = generate_hash_id(),
        title = data["title"],
        banner = random.choice(banners),
        description = data["description"],
    )
    db.session.add(environment)
    db.session.commit()
    return environment.to_dict()

@environment_routes.route('/<int:environment_id>', methods=['PUT'])
@login_required
def update_environment(environment_id):
    environment = Environment.query.get(environment_id)
    data = request.json
    if 'title' in data.keys():
        environment.title = data["title"]
    if 'description' in data.keys():
        environment.description = data["description"]
    db.session.commit()
    return environment.to_dict()

@environment_routes.route('/<int:environment_id>', methods=['DELETE'])
@login_required
def delete_environment(environment_id):
    env = Environment.query.get(environment_id)
    db.session.delete(env)
    db.session.commit()
    return {'environmentId': environment_id}
