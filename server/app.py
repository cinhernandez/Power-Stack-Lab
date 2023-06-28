#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response, session
# Remote library imports
from flask import request
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from os import environ
# from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from config import app, db, api
import secrets

# Local imports
from config import app, db, api
from models import db, User, MaxLift, Lift, LiftSet

# load_dotenv('.env')
# Views go here!
bcrypt = Bcrypt() 



migrate = Migrate(app, db)

app.secret_key = environ.get('SECRET_KEY')

api = Api(app)

@app.route('/')
def index():
    return 'Power Stack Lab'

class UserList(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
api.add_resource(UserList, '/users')


class UserListById(Resource):
   def get(self, id):
       user = User.query.get(id)
       if not user:
           return {'error': '404: User not found'}, 404
       return make_response(jsonify(user.to_dict()), 200)
       

api.add_resource(UserListById, '/users/<int:id>')

class MaxLiftsList(Resource):
    def get(self):
        max_lifts = [max_lift.to_dict() for max_lift in MaxLift.query.all()]
        return make_response(jsonify(max_lifts), 200)

api.add_resource(MaxLiftsList, '/max_lifts')



app.route('/create/max_lifts', methods=['POST'])
def create_maxlifts(self):
    data = request.get_json()
    if not data or 'date' not in data or 'squat_max' not in data or 'bench_max' not in data or 'deadlift_max' not in data or 'bench_max' not in data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    maxlift_date = data['date']
    maxlift_squat_max = data['squat_max']
    maxlift_bench_max = data['bench_max']
    maxlift_deadlift_max = data['deadlift_max']

    max_lift = MaxLift(date=maxlift_date, squat_max=maxlift_squat_max, bench_max=maxlift_bench_max, deadlift_max=maxlift_deadlift_max)
    db.session.add(max_lift)
    db.session.commit()

    return make_response(jsonify(max_lift.to_dict()), 201)


class MaxLiftListById(Resource):
    def get(self, id):
        max_lift = MaxLift.query.get(id)
        if not max_lift:
            return {'error': '404: Max Lift not found'}, 404
        return make_response(jsonify(max_lift.to_dict()), 200) 

api.add_resource(MaxLiftListById, '/max_lifts/<int:id>')


class liftsList(Resource):
    def get(self):
        lifts = [lift.to_dict() for lift in Lift.query.all()]
        return make_response(jsonify(lifts), 200)
    
api.add_resource(liftsList, '/lifts')
    

class liftsListById(Resource):
    def get(self, id):
        lift = Lift.query.get(id)
        if not lift:
            return make_response({'error': '404: Lift not found'}, 404)
        return make_response(jsonify(lift.to_dict()), 200)
    
    def delete(self, id):
        lift = Lift.query.get(id)
        if not lift:
            return {'error': '404: Lift not found'}, 404
        
        db.session.delete(lift)
        db.session.commit()
        return make_response({'message': 'Lift deleted successfully'}, 200)

api.add_resource(liftsListById, '/lifts/<int:id>')


class liftSetList(Resource):
    def get(self):
        lift_sets = [lift_set.to_dict() for lift_set in LiftSet.query.all()]
        return make_response(jsonify(lift_sets), 200)

api.add_resource(liftSetList, '/lift_sets')


class liftSetListById(Resource):
    def get(self, id):
        lift_set = LiftSet.query.get(id)
        if not lift_set:
            return make_response({'error': '404: Lift Set not found'}, 404)
        return {}

    
api.add_resource(liftSetListById, '/lift_sets/<int:id>')


@app.route('/track/liftset', methods=['POST'])
def track_lift_set():
   username = session.get('username')
   exercise = request.form['exercise']
   weight_lifted = float(request.form['weight_lifted'])
   set_number = int(request.form['set_number'])
   reps = int(request.form['reps'])
   notes = request.form['notes'] 
   
   user = User.query.filter_by(username=username).first()
   
   if user:
       lift = Lift(name=exercise, user=user)
       db.session.add(lift)
       db.session.commit()
       
       lift_set =LiftSet(set_number=set_number, weight_lifted=weight_lifted, reps=reps, notes=notes, lift=lift)
       db.session.add(lift_set)
       db.session.commit()
       
       return 'Fitness tracked successfully!'
   else:
       return 'User not found!'
        



class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        password = data.get('password')

        user = User(username=data.get('username'), password=password, email=data.get('email'))
        user.created_at = datetime.now()

        db.session.add(user)
        db.session.commit()
        
        session['username'] = user.username

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

    session['username'] = user.username

    return make_response(jsonify({'message': 'Logged in successfully', 'user_id': user.id}), 200)


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from the session
    return make_response(jsonify({'message': 'Logged out successfully'}), 200)



if __name__ == '__main__':
    app.run(port=5555, debug=True)
