from flask import Flask
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, TIMESTAMP, Boolean
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

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

    max_lifts = db.relationship('MaxLift', backref='user')
    training_programs = db.relationship('TrainingProgram', backref='user')
    workout_sessions = db.relationship('WorkoutSession', backref='user')


    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if User.query.filter(User.username == username, User.id != self.id).first():
            raise AssertionError('Username is already in use')
        if len(username) < 5 or len(username) > 20:
            raise AssertionError('Username must be between 5 and 20 characters')
        return username
    
    

    def __rep__(self):
        return '<User {self.username}>'
    
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
        password_bytes = password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password_bytes, salt)
        self._password_hash = hashed_password.decode('utf-8')


class MaxLift(db.Model, SerializerMixin):
    __tablename__ = 'max_lifts'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    squat_max = Column(Integer, nullable=False)
    bench_max = Column(Integer, nullable=False)
    deadlift_max = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)

  

class TrainingProgram(db.Model, SerializerMixin):
    __tablename__ = 'training_programs'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)
    frequency = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    workouts = db.relationship('WorkoutSession', backref='training_program')


class Compound(db.Model, SerializerMixin):
    __tablename__ = 'compounds'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    compound_trainings = db.relationship('CompoundTraining', backref='compound')
   


class Accessory(db.Model, SerializerMixin):
    __tablename__ = 'accessories'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
  
    accessory_trainings = db.relationship('AccessoryTraining', backref='accessory')


class CompoundTraining(db.Model, SerializerMixin):
    __tablename__ = 'compound_trainings'
    id = Column(Integer, primary_key=True)
    sets = Column(Integer, nullable=False)
    reps = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    compound_lift_id = Column(Integer, ForeignKey('compounds.id'), nullable=False)
    
class AccessoryTraining(db.Model, SerializerMixin):
    __tablename__ = 'accessory_trainings'
    id = Column(Integer, primary_key=True)
    sets = Column(Integer, nullable=False)
    reps = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    accessory_id = Column(Integer, ForeignKey('accessories.id'), nullable=False)

class WorkoutSession(db.Model, SerializerMixin):
    __tablename__ = 'workout_sessions'
    id = Column(Integer, primary_key=True)
    date = Column(String, nullable=False)
    notes = Column(String(250), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    training_program_id = Column(Integer, ForeignKey('training_programs.id'), nullable=False)
    
    
  