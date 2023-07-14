from flask import Flask
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, TIMESTAMP, Boolean
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_bcrypt import bcrypt   



# import flask_bcrypt as bcrypt
from faker import Faker
# from flask_bcrypt import bcrypt

convention = {
  "ix": "ix_%(column_0_label)s",
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}



metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(20), unique=True, nullable=False)
    _password_hash = Column(String, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False)

    serialize_rules=('-lift_sets', '-max_lifts', '-posts')
    
  


    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if User.query.filter(User.username == username, User.id != self.id).first():
            raise AssertionError('Username is already in use')
        if len(username) < 3 or len(username) > 20:
            raise AssertionError('Username must be between 5 and 20 characters')
        return username
    
    

    def __rep__(self):
        return f'<User {self.username}>'
    
    @property
    def password(self):
        raise AttributeError('Password issue')
    
    @password.setter
    def password(self, password):
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt)
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self, password):
        password_bytes = password.encode("utf-8")
        hashed_password = self._password_hash.encode("utf-8")
        return bcrypt.checkpw(password_bytes, hashed_password)


class MaxLift(db.Model, SerializerMixin):
    __tablename__ = 'max_lifts'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    squat_max = Column(Integer, nullable=False)
    bench_max = Column(Integer, nullable=False)
    deadlift_max = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)

    users = db.relationship('User', backref='max_lifts')

class LiftSet(db.Model, SerializerMixin):
    __tablename__ = 'lift_sets'
    id=Column(Integer, primary_key=True)
    name=Column(String, nullable=False)
    set_number = Column(Integer, nullable=False)
    weight_lifted = Column(Integer, nullable=False)
    reps= Column(Integer, nullable=False)
    notes = Column(String, nullable=True)
    date = Column(DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    users = db.relationship('User', backref='lift_sets')
    
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    body = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False)
    
    users = db.relationship('User', backref='posts')

