from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_teacher_1 = User(
        email='demoTeacher1@aa.io',
        hashed_password='password', 
        first_name='Demo1', 
        last_name='Teacher1',
        role="teacher",
        suffix="Mr.",
        phone_number="(201) 555-5555"
        )
    
    demo_teacher_2 = User(
        email='demoTeacher2@aa.io',
        hashed_password='password', 
        first_name='Demo2', 
        last_name='Teacher2',
        role="teacher",
        suffix="Mrs.",
        phone_number="(201) 555-5555"
        )

    demo_student_1 = User(
        email='demoKid1@aa.io', 
        hashed_password='password',
        first_name="Kid1",
        last_name="Student1",
        role="student",
        points=5
        )
    
    demo_student_2 = User(
        email='demoKid2@aa.io', 
        hashed_password='password',
        first_name="Kid2",
        last_name="Student2",
        role="student",
        points=5
        )

    demo_parent_1 = User(
        email='demoParent1@aa.io', 
        hashed_password='password',
        first_name="Adult1",
        last_name="Parent1",
        role="parent",
        phone_number="(201) 666-6666"
        )
    
    demo_parent_2 = User(
        email='demoParent2@aa.io', 
        hashed_password='password',
        first_name="Adult2",
        last_name="Parent2",
        role="parent",
        phone_number="(201) 666-6666"
        )

    db.session.add(demo_teacher_1)
    db.session.add(demo_teacher_2)
    db.session.add(demo_student_1)
    db.session.add(demo_student_2)
    db.session.add(demo_parent_1)
    db.session.add(demo_parent_2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
