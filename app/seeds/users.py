from app.models import db, User, environment, SCHEMA, Class, StudentClass, Reward
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
    
    demo_student_3 = User(
        email='demoKid3@aa.io', 
        hashed_password='password',
        first_name="Kid3",
        last_name="Student3",
        role="student",
        points=5
        )
    
    demo_student_4 = User(
        email='demoKid4@aa.io', 
        hashed_password='password',
        first_name="Kid4",
        last_name="Student4",
        role="student",
        points=5
        )
    
    demo_student_5 = User(
        email='demoKid5@aa.io', 
        hashed_password='password',
        first_name="Kid5",
        last_name="Student5",
        role="student",
        points=5
        )
    
    demo_student_6 = User(
        email='demoKid6@aa.io', 
        hashed_password='password',
        first_name="Kid6",
        last_name="Student6",
        role="student",
        points=5
        )
    
    demo_student_7 = User(
        email='demoKid7@aa.io', 
        hashed_password='password',
        first_name="Kid7",
        last_name="Student7",
        role="student",
        points=5
        )
    
    demo_student_8 = User(
        email='demoKid8@aa.io', 
        hashed_password='password',
        first_name="Kid8",
        last_name="Student8",
        role="student",
        points=5
        )
    
    demo_student_9 = User(
        email='demoKid9@aa.io', 
        hashed_password='password',
        first_name="Kid9",
        last_name="Student9",
        role="student",
        points=5
        )
    
    demo_student_10 = User(
        email='demoKid10@aa.io', 
        hashed_password='password',
        first_name="Kid10",
        last_name="Student10",
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
    db.session.add(demo_student_3)
    db.session.add(demo_student_4)
    db.session.add(demo_student_5)
    db.session.add(demo_student_6)
    db.session.add(demo_student_7)
    db.session.add(demo_student_8)
    db.session.add(demo_student_9)
    db.session.add(demo_student_10)
    db.session.add(demo_parent_1)
    db.session.add(demo_parent_2)
    db.session.commit()

def seed_classes():
    demo_class_1 = Class(
        student_count=5,
        subject='Math',
        student_invite_code='4dDxP5dl',
        parent_invite_code='kL4hKiGu',
        teacher_id=1
    )

    demo_class_2 = Class(
        student_count=5,
        subject='Reading',
        student_invite_code='NmhbVKZF',
        parent_invite_code='QqGHDK33',
        teacher_id=2
    )

    db.session.add(demo_class_1)
    db.session.add(demo_class_2)
    db.session.commit()

def seed_student_class():
    demo_student_class_1 = StudentClass(
        student_id=3,
        class_id=1
    )

    demo_student_class_2 = StudentClass(
        student_id=5,
        class_id=1
    )

    demo_student_class_3 = StudentClass(
        student_id=7,
        class_id=1
    )

    demo_student_class_4 = StudentClass(
        student_id=9,
        class_id=1
    )

    demo_student_class_5 = StudentClass(
        student_id=11,
        class_id=1
    )

    demo_student_class_6 = StudentClass(
        student_id=4,
        class_id=2
    )

    demo_student_class_7 = StudentClass(
        student_id=6,
        class_id=2
    )

    demo_student_class_8 = StudentClass(
        student_id=8,
        class_id=2
    )

    demo_student_class_9 = StudentClass(
        student_id=10,
        class_id=2
    )

    demo_student_class_10 = StudentClass(
        student_id=12,
        class_id=2
    )

    db.session.add(demo_student_class_1)
    db.session.add(demo_student_class_2)
    db.session.add(demo_student_class_3)
    db.session.add(demo_student_class_4)
    db.session.add(demo_student_class_5)
    db.session.add(demo_student_class_6)
    db.session.add(demo_student_class_7)
    db.session.add(demo_student_class_8)
    db.session.add(demo_student_class_9)
    db.session.add(demo_student_class_10)
    db.session.commit()

def seed_rewards():
    hard_working_1 = Reward(
        reward_type="Hard Working",
        points=3,
        class_id=1
    )

    kind_to_others_1 = Reward(
        reward_type="Kind to others",
        points=3,
        class_id=1
    )

    completed_homework_1 = Reward(
        reward_type="Completed Homework",
        points=3,
        class_id=1
    )

    test_passed_1 = Reward(
        reward_type="Completed Homework",
        points=3,
        class_id=1
    )

    hard_working_2 = Reward(
        reward_type="Hard Working",
        points=3,
        class_id=2
    )

    kind_to_others_2 = Reward(
        reward_type="Kind to others",
        points=3,
        class_id=2
    )

    completed_homework_2 = Reward(
        reward_type="Completed Homework",
        points=3,
        class_id=2
    )

    test_passed_2 = Reward(
        reward_type="Completed Homework",
        points=3,
        class_id=2
    )

    db.session.add(hard_working_1)
    db.session.add(kind_to_others_1)
    db.session.add(completed_homework_1)
    db.session.add(test_passed_1)
    db.session.add(hard_working_2)
    db.session.add(kind_to_others_2)
    db.session.add(completed_homework_2)
    db.session.add(test_passed_2)
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
        db.session.execute(text("DELETE FROM classes"))
        db.session.execute(text("DELETE FROM student_class"))
        db.session.execute(text("DELETE FROM rewards"))
        
    db.session.commit()
