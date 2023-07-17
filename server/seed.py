#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
import random
from datetime import datetime
from flask_migrate import Migrate
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
# Local imports
from app import app
from models import db, User, MaxLift, Post, LiftSet
# fake = Faker()

migrte = Migrate(app, db)

with app.app_context():
    db.create_all()

    fake = Faker()

    # Generating fake users
    for _ in range(2):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        created_at = fake.date_time_between(start_date='-1y', end_date='now')
        user = User(username=username, email=email, _password_hash=password, created_at=created_at)
        db.session.add(user)
        db.session.commit()

        # Generating fake max_lifts
        squat_max = fake.random_int(min=200, max=1001)
        bench_max = fake.random_int(min=100, max=900)
        deadlift_max = fake.random_int(min=200, max=1001)
        date = fake.date_this_year()
        max_lift = MaxLift(user_id=user.id, squat_max=squat_max, bench_max=bench_max, deadlift_max=deadlift_max, date=date)
        db.session.add(max_lift)
        db.session.commit()

      
        # Generate lift_set
        lift_names = ['Squat', 'Bench', 'Deadlift']
        
        name= fake.random_element(elements=lift_names)
        set_number = fake.random_int(min=3, max=5)
        weight_lifted = fake.random_int(min=5, max=120)
        reps = fake.random_int(min=6, max=10)
        notes = 'completed'
        date = fake.date_this_year()
        lift_set = LiftSet(name=name, set_number=set_number, reps=reps, weight_lifted=weight_lifted, notes=notes, date=date, user_id=user.id)
        db.session.add(lift_set)
        db.session.commit()
        
        
        
        title = "lifting"
        body = fake.paragraph()
        date = fake.date_this_year()
        post = Post(title=title, body=body, date=date, user_id=user.id)
        db.session.add(post)
        db.session.commit()
        







# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         print("Starting seed...")
#         Seed code goes here!
       