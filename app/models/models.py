from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import random
import string

def generate_hash_id():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    environments = db.relationship("Environment", back_populates="user", cascade="all,delete-orphan")

class Environment(db.Model):
    __tablename__ = 'environments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    hashed_id = db.Column(db.String)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    def set_hashed_id(self):
        self.hashed_id = generate_hash_id()

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'hashedId': self.hashed_id,
            'title': self.title,
            'description': self.description,
            'jobLinks': [{"link": job.to_dict()["hashedId"], "title": job.to_dict()["title"]} for job in self.jobs]
        }

    user = db.relationship("User", back_populates="environments")
    jobs = db.relationship("Job", back_populates="environment", cascade="all,delete-orphan")

class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    environment_id = db.Column(db.Integer, db.ForeignKey("environments.id"), nullable=False)
    hashed_id = db.Column(db.String)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    def set_hashed_id(self):
        self.hashed_id = generate_hash_id()

    def to_dict(self):
        return {
            'id': self.id,
            'environmentId': self.environment_id,
            'hashedId': self.hashed_id,
            'title': self.title,
            'description': self.description,
        }

    environment = db.relationship("Environment", back_populates="jobs")
    tasks = db.relationship("Task", back_populates="job", cascade="all,delete-orphan")

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"), nullable=False)
    title = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    details = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'jobId': self.job_id,
            'title': self.title,
            'status': self.status,
            'details': self.details,
        }

    job = db.relationship("Job", back_populates="tasks")
