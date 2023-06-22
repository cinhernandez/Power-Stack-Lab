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
from models import db, User, MaxLift, TrainingProgram, WorkoutSession, Compound, Accessory, CompoundTraining, AccessoryTraining
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

        # Generating fake training_programs
        name = 'Powerlifting'
        duration = '{} weeks'.format(fake.random_int(min=8, max=12))
        frequency = '{} days'.format(fake.random_int(min=3, max=5))
        training_program = TrainingProgram(user_id=user.id, name=name, duration=duration, frequency=frequency)
        db.session.add(training_program)
        db.session.commit()

        # Generate fake compound
        compound_names = ['Squat', 'Bench', 'Deadlift']
        for compound_name in compound_names:
            compound = Compound(name = compound_name)
            db.session.add(compound)
            db.session.commit()

            # Generate fake compound_training
            sets = fake.random_int(min=1, max=5)
            reps = fake.random_int(min=5, max=10)
            weight = fake.random_int(min=5, max=1001)
            compound_training = CompoundTraining(sets=sets, reps=reps, weight=weight, compound_lift_id=compound.id, training_program_id=training_program.id)
            db.session.add(compound_training)
            db.session.commit()

        # Generate fake accessory
        
        workout_names = ['Romaian Deadlifts', 'Leg Extensions', 'Leg Curls', 'Walking Lunges', 'Blugarian Split Squats', 
                         'Incline Dumbbell Bench Press', 'Dumbbell Flys', 'Dumbbell Bench Press', 'Pushups', 'Dips', 
                         'Pullups', 'Lat Pulldowns', 'Seated Cable Rows', 'Dumbbell Rows', 'Barbell Rows', 
                         'Dumbbell Shoulder Press', 'Dumbbell Lateral Raises', 'Dumbbell Front Raises', 'Dumbbell Rear Delt Flys', 'Face Pulls',
                         'Barbell Curls', 'Dumbbell Curls', 'Hammer Curls', 'Tricep Pushdowns', 'Skull Crushers', 
                         'Planks', 'Hanging Leg Raises', 'Cable Crunches', 'Ab Wheel Rollouts']
        for workout_name in workout_names:
            name = random.choice(workout_names)
            accessory = Accessory(name = name)
            db.session.add(accessory)    
            db.session.commit()

            # Generate fake accessory_training
            sets = fake.random_int(min=3, max=5)
            reps = fake.random_int(min=6, max=10)
            weight = fake.random_int(min=5, max=120)
            accessory_training = AccessoryTraining(sets=sets, reps=reps, weight=weight, accessory_id=accessory.id, training_program_id=training_program.id)
            db.session.add(accessory_training)
            db.session.commit()

        # Generate fake workout_session
        for _ in range(2):
            notes= 'completed'
            date = fake.date_this_year()
            workout_session = WorkoutSession(user_id=user.id, training_program_id=training_program.id, notes= notes, date=date)
            db.session.add(workout_session)
            db.session.commit()







# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         print("Starting seed...")
#         Seed code goes here!
       