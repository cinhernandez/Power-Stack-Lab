#!/usr/bin/env python3

# Standard library imports
from flask import Flask, request, jsonify, make_response, session
# Remote library imports
from flask import request
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

from os import environ
# from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from config import app, db, api
import secrets
import logging
from datetime import datetime

# Local imports
from config import app, db, api
from models import db, User, MaxLift, Post, LiftSet

# load_dotenv('.env')
# Views go here!
bcrypt = Bcrypt() 

logging.basicConfig(level=logging.INFO)


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


class MaxLiftList(Resource):
    def get(self):
        max_lifts = [max_lift.to_dict() for max_lift in MaxLift.query.all()]
        return make_response(jsonify(max_lifts), 200)
    
    def post(self):
        user_id = session.get('user_id')
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {'message': 'Unauthorized'}, 401

        max_lift_data = request.get_json()

        try: 
            max_lifts = MaxLift(
                user_id=user_id,
                squat_max=max_lift_data['squat_max'],
                bench_max=max_lift_data['bench_max'],
                deadlift_max=max_lift_data['deadlift_max'],
                date=max_lift_data['date']
            )
            db.session.add(max_lifts)
            db.session.commit()
        
            return make_response(jsonify(max_lifts.to_dict()), 201)

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500

api.add_resource(MaxLiftList, '/max_lifts')



class MaxLiftListById(Resource):
    def get(self, id):
        max_lift = MaxLift.query.get(id)
        if not max_lift:
            return {'error': '404: Max Lift not found'}, 404
        return make_response(jsonify(max_lift.to_dict()), 200) 
    
    def delete(self, id):
        max_lift = MaxLift.query.get(id)
        if not max_lift:
            return {'error': '404: Max Lift not found'}, 404
        
        db.session.delete(max_lift)
        db.session.commit()
        return make_response({'message': 'Max Lift deleted successfully'}, 200)
    
    def patch(self, id):
        max_lift = MaxLift.query.get(id)
        if not max_lift:
            return {'error': '404: Max Lift not found'}, 404

        data = request.get_json()
        for key, value in data.items():
            setattr(max_lift, key, value)

        db.session.commit()
        return make_response(jsonify(max_lift.to_dict()), 200)

api.add_resource(MaxLiftListById, '/max_lifts/<int:id>')


class LiftsSetList(Resource):
    def get(self):
        lift_sets = [lift_set.to_dict() for lift_set in LiftSet.query.all()]
        return make_response(jsonify(lift_sets), 200)
    
    
    def post(self):
        user_id = session.get('user_id')
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {'message': 'Unauthorized'}, 401

        lift_set_data = request.get_json()

        try: 
            lift_set = LiftSet(
                user_id=user_id,
                name=lift_set_data['name'],
                set_number=lift_set_data['set_number'],
                weight_lifted=lift_set_data['weight_lifted'],
                reps=lift_set_data['reps'],
                notes=lift_set_data['notes'],
                date=lift_set_data['date']
            )
            db.session.add(lift_set)
            db.session.commit()
        
            return make_response(jsonify(lift_set.to_dict()), 201)

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500
    
api.add_resource(LiftsSetList, '/lift_sets')
    

class LiftsSetById(Resource):
    def get(self, id):
        lift = LiftSet.query.get(id)
        if not lift:
            return {'error': '404: Max Lift not found'}, 404
        return make_response(jsonify(lift.to_dict()), 200) 
    
    def delete(self, id):
        lift = LiftSet.query.get(id)
        if not lift:
            return {'error': '404: Lift not found'}, 404
        
        db.session.delete(lift)
        db.session.commit()
        return make_response({'message': 'Lift deleted successfully'}, 200)
    
    def patch(self, id):
        lift = LiftSet.query.get(id)
        if not lift:
            return {'error': '404: Lift not found'}, 404

        data = request.get_json()
        for key, value in data.items():
            setattr(lift, key, value)

        db.session.commit()
        return make_response(jsonify(lift.to_dict()), 200)
    
api.add_resource(LiftsSetById, '/lift_sets/<int:id>')



class PostsList(Resource):  
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        return make_response(jsonify(posts), 200)
    
    def post(self):
        user_id = session.get('user_id')
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {'message': 'Unauthorized'}, 401

        post_data = request.get_json()

        try: 
            post = Post(
                user_id=user_id,
                title=post_data['title'],
                content=post_data['content'],
                date=post_data['date']
            )
            db.session.add(post)
            db.session.commit()
        
            return make_response(jsonify(post.to_dict()), 201)

        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500
    
api.add_resource(PostsList, '/posts')


class PostsListById(Resource):
    def get(self, id):
        post = Post.query.get(id)
        if not post:
            return {'error': '404: Post not found'}, 404
        return make_response(jsonify(post.to_dict()), 200)
    
    def delete(self, id):
        post = Post.query.get(id)
        if not post:
            return {'error': '404: Post not found'}, 404
        
        db.session.delete(post)
        db.session.commit()
        return make_response({'message': 'Post deleted successfully'}, 200)
    
    def patch(self, id):
        post = Post.query.get(id)
        if not post:
            return {'error': '404: Post not found'}, 404

        data = request.get_json()
        for key, value in data.items():
            setattr(post, key, value)

        db.session.commit()
        return make_response(jsonify(post.to_dict()), 200)

api.add_resource(PostsListById, '/posts/<int:id>')



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

    user_id = user.id
    
    session['username'] = user.username
    session['user_id'] = user.id
    
    logging.info(f'Session data after login: {session}')

    return make_response(jsonify({'message': 'Logged in successfully', 'user_id': user.id}), 200)


@app.route('/logout', methods=['POST'])
def logout():
    logging.info(f'Session data before logout: {session}')
    
    session.pop('user_id', None)  # Remove user ID from the session
    
    logging.info(f'Session data after logout: {session}')
    
    return make_response(jsonify({'message': 'Logged out successfully'}), 200)



if __name__ == '__main__':
    app.run(port=5555, debug=True)
