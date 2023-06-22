#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response, session
# Remote library imports
from flask import request
from flask_restful import Resource, Api

# Local imports
from config import app, db, api
from models import db, User, MaxLift, TrainingProgram, WorkoutSession, Compound, Accessory, CompoundTraining, AccessoryTraining

# Views go here!

api = Api(app)

@app.route('/')
def index():
    return 'Power Stack Lab'



class ProgramsList(Resource):
    def get(self):
        programs = TrainingProgram.query.all()
        return jsonify([program.to_dict() for program in programs])

api.add_resource(ProgramsList, '/programs')


class ProgramDetailsById(Resource):
    def get(self, id):
        program = TrainingProgram.query.get(id)
        return jsonify(program.to_dict())
api.add_resource(ProgramDetailsById, '/programs/<int:id>')

class UsersList(Resource):
    def get(self):
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
api.add_resource(UsersList, '/users')

class ProgramCreation(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        name = data.get('name')
        duration = data.get('duration')
        frequency = data.get('frequency')

        program = TrainingProgram(name=name, duration=duration, frequency=frequency)
        db.session.add(program)
        db.session.commit()

        return make_response(jsonify({'message': 'Program created successfully'}), 201)

api.add_resource(ProgramCreation, '/programs/create')

class WorkoutSessionsTracker(Resource):
    def get(self):
        sessions = WorkoutSession.query.all()
        return jsonify([session.to_dict() for session in sessions])
    
api.add_resource(WorkoutSessionsTracker, '/workout_sessions')



class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        password = data.get('password')
        #hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(username=data.get('username'), password=password, email=data.get('email'))
        user.created_at = datetime.now()

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User created successfully'}), 201)

api.add_resource(Signup, '/signup')


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.authenticate(password):
        return make_response(jsonify({'error': 'Invalid username or password'}), 401)

    session['user_id'] = user.id

    return make_response(jsonify({'message': 'Logged in successfully', 'user_id': user.id}), 200)


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from the session
    return make_response(jsonify({'message': 'Logged out successfully'}), 200)



if __name__ == '__main__':
    app.run(port=5555, debug=True)
