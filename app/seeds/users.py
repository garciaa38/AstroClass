from app.models import db, User, environment, SCHEMA, Class, StudentClass, Reward, Feedback, MessageBoard, Post, PostImage, PostReply, PostReaction, PostReplyReaction
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo_teacher_1 = User(
#         email='demoTeacher1@aa.io',
#         hashed_password='password', 
#         first_name='Demo1', 
#         last_name='Teacher1',
#         role="teacher",
#         suffix="Mr.",
#         phone_number="(201) 555-5555"
#         )
    
#     demo_teacher_2 = User(
#         email='demoTeacher2@aa.io',
#         hashed_password='password', 
#         first_name='Demo2', 
#         last_name='Teacher2',
#         role="teacher",
#         suffix="Mrs.",
#         phone_number="(201) 555-5555"
#         )

#     demo_student_1 = User(
#         email='demoKid1@aa.io', 
#         hashed_password='password',
#         first_name="Kid1",
#         last_name="Student1",
#         role="student",
#         points=5
#         )
    
#     demo_student_2 = User(
#         email='demoKid2@aa.io', 
#         hashed_password='password',
#         first_name="Kid2",
#         last_name="Student2",
#         role="student",
#         points=5
#         )
    
#     demo_student_3 = User(
#         email='demoKid3@aa.io', 
#         hashed_password='password',
#         first_name="Kid3",
#         last_name="Student3",
#         role="student",
#         points=5
#         )
    
#     demo_student_4 = User(
#         email='demoKid4@aa.io', 
#         hashed_password='password',
#         first_name="Kid4",
#         last_name="Student4",
#         role="student",
#         points=5
#         )
    
#     demo_student_5 = User(
#         email='demoKid5@aa.io', 
#         hashed_password='password',
#         first_name="Kid5",
#         last_name="Student5",
#         role="student",
#         points=5
#         )
    
#     demo_student_6 = User(
#         email='demoKid6@aa.io', 
#         hashed_password='password',
#         first_name="Kid6",
#         last_name="Student6",
#         role="student",
#         points=5
#         )
    
#     demo_student_7 = User(
#         email='demoKid7@aa.io', 
#         hashed_password='password',
#         first_name="Kid7",
#         last_name="Student7",
#         role="student",
#         points=5
#         )
    
#     demo_student_8 = User(
#         email='demoKid8@aa.io', 
#         hashed_password='password',
#         first_name="Kid8",
#         last_name="Student8",
#         role="student",
#         points=5
#         )
    
#     demo_student_9 = User(
#         email='demoKid9@aa.io', 
#         hashed_password='password',
#         first_name="Kid9",
#         last_name="Student9",
#         role="student",
#         points=5
#         )
    
#     demo_student_10 = User(
#         email='demoKid10@aa.io', 
#         hashed_password='password',
#         first_name="Kid10",
#         last_name="Student10",
#         role="student",
#         points=5
#         )
    
    
#     demo_parent_1 = User(
#         email='demoParent1@aa.io', 
#         hashed_password='password',
#         first_name="Adult1",
#         last_name="Parent1",
#         role="parent",
#         phone_number="(201) 666-6666"
#         )
    
#     demo_parent_2 = User(
#         email='demoParent2@aa.io', 
#         hashed_password='password',
#         first_name="Adult2",
#         last_name="Parent2",
#         role="parent",
#         phone_number="(201) 666-6666"
#         )

#     db.session.add(demo_teacher_1)
#     db.session.add(demo_teacher_2)
#     db.session.add(demo_student_1)
#     db.session.add(demo_student_2)
#     db.session.add(demo_student_3)
#     db.session.add(demo_student_4)
#     db.session.add(demo_student_5)
#     db.session.add(demo_student_6)
#     db.session.add(demo_student_7)
#     db.session.add(demo_student_8)
#     db.session.add(demo_student_9)
#     db.session.add(demo_student_10)
#     db.session.add(demo_parent_1)
#     db.session.add(demo_parent_2)
#     db.session.commit()

# def seed_classes():
#     demo_class_1 = Class(
#         student_count=5,
#         class_name='Class 5-1',
#         subject='Math',
#         student_invite_code='4dDxP5dl',
#         parent_invite_code='kL4hKiGu',
#         teacher_id=1
#     )

#     demo_class_2 = Class(
#         student_count=5,
#         class_name='Class 5-2',
#         subject='Reading',
#         student_invite_code='NmhbVKZF',
#         parent_invite_code='QqGHDK33',
#         teacher_id=2
#     )

#     demo_class_3 = Class(
#         student_count=5,
#         class_name='Class 5-3',
#         subject='Math',
#         student_invite_code='4dDxP5dl',
#         parent_invite_code='kL4hKiGu',
#         teacher_id=1
#     )

#     db.session.add(demo_class_1)
#     db.session.add(demo_class_2)
#     db.session.add(demo_class_3)
#     db.session.commit()

# def seed_student_class():
#     demo_student_class_1 = StudentClass(
#         student_id=3,
#         class_id=1,
#         planet='mercury',
#         points=10
#     )

#     demo_student_class_2 = StudentClass(
#         student_id=5,
#         class_id=1,
#         planet='earth',
#         points=9
#     )

#     demo_student_class_3 = StudentClass(
#         student_id=7,
#         class_id=1,
#         planet='mars',
#         points=8
#     )

#     demo_student_class_4 = StudentClass(
#         student_id=9,
#         class_id=1,
#         planet='venus',
#         points=7
#     )

#     demo_student_class_5 = StudentClass(
#         student_id=11,
#         class_id=1,
#         planet='jupiter',
#         points=6
#     )

#     demo_student_class_6 = StudentClass(
#         student_id=4,
#         class_id=2,
#         planet='uranus',
#         points=5
#     )

#     demo_student_class_7 = StudentClass(
#         student_id=6,
#         class_id=2,
#         planet='pluto',
#         points=4
#     )

#     demo_student_class_8 = StudentClass(
#         student_id=8,
#         class_id=2,
#         planet='saturn',
#         points=3
#     )

#     demo_student_class_9 = StudentClass(
#         student_id=10,
#         class_id=2,
#         planet='neptune',
#         points=2
#     )

#     demo_student_class_10 = StudentClass(
#         student_id=12,
#         class_id=2,
#         planet='uranus',
#         points=1
#     )

#     demo_student_class_11 = StudentClass(
#         student_id=4,
#         class_id=3,
#         planet='earth',
#         points=5
#     )

#     demo_student_class_12 = StudentClass(
#         student_id=6,
#         class_id=3,
#         planet='jupiter',
#         points=4
#     )

#     demo_student_class_13 = StudentClass(
#         student_id=8,
#         class_id=3,
#         planet='pluto',
#         points=3
#     )

#     demo_student_class_14 = StudentClass(
#         student_id=10,
#         class_id=3,
#         planet='mars',
#         points=2
#     )

#     demo_student_class_15 = StudentClass(
#         student_id=12,
#         class_id=3,
#         planet='mercury',
#         points=1
#     )

#     db.session.add(demo_student_class_1)
#     db.session.add(demo_student_class_2)
#     db.session.add(demo_student_class_3)
#     db.session.add(demo_student_class_4)
#     db.session.add(demo_student_class_5)
#     db.session.add(demo_student_class_6)
#     db.session.add(demo_student_class_7)
#     db.session.add(demo_student_class_8)
#     db.session.add(demo_student_class_9)
#     db.session.add(demo_student_class_10)
#     db.session.add(demo_student_class_11)
#     db.session.add(demo_student_class_12)
#     db.session.add(demo_student_class_13)
#     db.session.add(demo_student_class_14)
#     db.session.add(demo_student_class_15)
#     db.session.commit()

# def seed_rewards():
#     hard_working_1 = Reward(
#         reward_type="Hard Working",
#         points=3,
#         class_id=1
#     )

#     kind_to_others_1 = Reward(
#         reward_type="Kind to others",
#         points=3,
#         class_id=1
#     )

#     completed_homework_1 = Reward(
#         reward_type="Completed Homework",
#         points=3,
#         class_id=1
#     )

#     test_passed_1 = Reward(
#         reward_type="Completed Homework",
#         points=3,
#         class_id=1
#     )

#     hard_working_2 = Reward(
#         reward_type="Hard Working",
#         points=3,
#         class_id=2
#     )

#     kind_to_others_2 = Reward(
#         reward_type="Kind to others",
#         points=3,
#         class_id=2
#     )

#     completed_homework_2 = Reward(
#         reward_type="Completed Homework",
#         points=3,
#         class_id=2
#     )

#     test_passed_2 = Reward(
#         reward_type="Completed Homework",
#         points=3,
#         class_id=2
#     )

#     db.session.add(hard_working_1)
#     db.session.add(kind_to_others_1)
#     db.session.add(completed_homework_1)
#     db.session.add(test_passed_1)
#     db.session.add(hard_working_2)
#     db.session.add(kind_to_others_2)
#     db.session.add(completed_homework_2)
#     db.session.add(test_passed_2)
#     db.session.commit()

# def seed_feedback():
#     lack_of_effort_1 = Feedback(
#         feedback_type="Lack of Effort",
#         points=-1,
#         class_id=1,
#     )

#     lack_of_effort_2 = Feedback(
#         feedback_type="Lack of Effort",
#         points=-1,
#         class_id=2,
#     )

#     missing_homework_1 = Feedback(
#         feedback_type="Missing Homework",
#         points=-2,
#         class_id=1,
#     )

#     missing_homework_2 = Feedback(
#         feedback_type="Missing Homework",
#         points=-2,
#         class_id=2,
#     )

#     disrupting_class_1 = Feedback(
#         feedback_type="Disruptive Behavior",
#         points=-3,
#         class_id=1,
#     )

#     disrupting_class_2 = Feedback(
#         feedback_type="Disruptive Behavior",
#         points=-3,
#         class_id=2,
#     )

#     db.session.add(lack_of_effort_1)
#     db.session.add(lack_of_effort_2)
#     db.session.add(missing_homework_1)
#     db.session.add(missing_homework_2)
#     db.session.add(disrupting_class_1)
#     db.session.add(disrupting_class_2)
#     db.session.commit()

# def seed_message_board():
#     message_board_class_1 = MessageBoard(
#         permission="teacher_and_student",
#         class_id=1
#     )

#     message_board_class_2 = MessageBoard(
#         permission="teacher_only",
#         class_id=2
#     )

#     message_board_class_3 = MessageBoard(
#         permission="students_partial",
#         class_id=3
#     )

#     db.session.add(message_board_class_1)
#     db.session.add(message_board_class_2)
#     db.session.add(message_board_class_3)
#     db.session.commit()

# def seed_posts():
#     post_1_message_board_1 = Post(
#         text_field="Good morning class! Ready for another awesome day of school?",
#         user_id=1,
#         message_board_id=1
#     )

#     post_2_message_board_1 = Post(
#         text_field="What's your favorite fortnite skin?",
#         user_id=1,
#         message_board_id=1
#     )

#     post_1_message_board_2 = Post(
#         text_field="Make sure to complete today's homework class!",
#         user_id=2,
#         message_board_id=2
#     )

#     post_2_message_board_2 = Post(
#         text_field="Don't forget to bring in picture day money for tomorrow",
#         user_id=2,
#         message_board_id=2
#     )

#     post_1_message_board_3 = Post(
#         text_field="Hope everyone had a great weekend! We'll be having presentations today after lunch, so make sure you're prepared.",
#         user_id=1,
#         message_board_id=3
#     )

#     post_2_message_board_3 = Post(
#         text_field="Remember that we're off this Thursday!",
#         user_id=1,
#         message_board_id=3
#     )

#     db.session.add(post_1_message_board_1)
#     db.session.add(post_2_message_board_1)
#     db.session.add(post_1_message_board_2)
#     db.session.add(post_2_message_board_2)
#     db.session.add(post_1_message_board_3)
#     db.session.add(post_2_message_board_3)
#     db.session.commit()

# def seed_post_replies():
#     post_reply_1_post_1 = PostReply(
#         text_field="Hellooooo",
#         user_id=3,
#         post_id=1
#     )

#     post_reply_2_post_1 = PostReply(
#         text_field="Not really but w/e",
#         user_id=5,
#         post_id=1
#     )

#     post_reply_1_post_2 = PostReply(
#         text_field="John Cena, duh",
#         user_id=3,
#         post_id=2
#     )

#     post_reply_2_post_2 = PostReply(
#         text_field="I like the banana",
#         user_id=7,
#         post_id=2
#     )

#     post_reply_1_post_5 = PostReply(
#         text_field="I'M NERVOUS",
#         user_id=4,
#         post_id=5
#     )

#     post_reply_2_post_5 = PostReply(
#         text_field="oh no, I forgot...",
#         user_id=8,
#         post_id=5
#     )

#     post_reply_1_post_6 = PostReply(
#         text_field="YAY NO SCHOOL",
#         user_id=6,
#         post_id=6
#     )

#     post_reply_2_post_6 = PostReply(
#         text_field="Anyone else going to be playing roblox this weekend?",
#         user_id=10,
#         post_id=6
#     )

#     db.session.add(post_reply_1_post_1)
#     db.session.add(post_reply_2_post_1)
#     db.session.add(post_reply_1_post_2)
#     db.session.add(post_reply_2_post_2)
#     db.session.add(post_reply_1_post_5)
#     db.session.add(post_reply_2_post_5)
#     db.session.add(post_reply_1_post_6)
#     db.session.add(post_reply_2_post_6)
#     db.session.commit()

# def seed_post_reactions():
#     post_reaction_1_post_1 = PostReaction(
#         emoji="😀",
#         user_id=7,
#         post_id=1
#     )

#     post_reaction_2_post_1 = PostReaction(
#         emoji="😩",
#         user_id=9,
#         post_id=1
#     )

#     post_reaction_1_post_2 = PostReaction(
#         emoji="🤪",
#         user_id=5,
#         post_id=2
#     )

#     post_reaction_2_post_2 = PostReaction(
#         emoji="😱",
#         user_id=3,
#         post_id=2
#     )

#     post_reaction_1_post_5 = PostReaction(
#         emoji="😭",
#         user_id=6,
#         post_id=5
#     )

#     post_reaction_2_post_5 = PostReaction(
#         emoji="😧",
#         user_id=10,
#         post_id=5
#     )

#     post_reaction_1_post_6 = PostReaction(
#         emoji="🥳",
#         user_id=4,
#         post_id=6
#     )

#     post_reaction_2_post_6 = PostReaction(
#         emoji="🤩",
#         user_id=8,
#         post_id=6
#     )

#     db.session.add(post_reaction_1_post_1)
#     db.session.add(post_reaction_2_post_1)
#     db.session.add(post_reaction_1_post_2)
#     db.session.add(post_reaction_2_post_2)
#     db.session.add(post_reaction_1_post_5)
#     db.session.add(post_reaction_2_post_5)
#     db.session.add(post_reaction_1_post_6)
#     db.session.add(post_reaction_2_post_6)
#     db.session.commit()

# def seed_post_reply_reactions():
#     post_reply_reaction_1_post_reply_1 = PostReplyReaction(
#         emoji="🤓",
#         user_id=7,
#         post_reply_id=1
#     )

#     post_reply_reaction_2_post_reply_1 = PostReplyReaction(
#         emoji="😆",
#         user_id=9,
#         post_reply_id=1
#     )

#     post_reply_reaction_1_post_reply_2 = PostReplyReaction(
#         emoji="🤣",
#         user_id=3,
#         post_reply_id=2
#     )

#     post_reply_reaction_2_post_reply_2 = PostReplyReaction(
#         emoji="😬",
#         user_id=5,
#         post_reply_id=2
#     )

#     post_reply_reaction_1_post_reply_3 = PostReplyReaction(
#         emoji="😎",
#         user_id=3,
#         post_reply_id=3
#     )

#     post_reply_reaction_2_post_reply_3 = PostReplyReaction(
#         emoji="😎",
#         user_id=9,
#         post_reply_id=3
#     )

#     post_reply_reaction_1_post_reply_4 = PostReplyReaction(
#         emoji="😂",
#         user_id=9,
#         post_reply_id=4
#     )

#     post_reply_reaction_2_post_reply_4 = PostReplyReaction(
#         emoji="🤮",
#         user_id=5,
#         post_reply_id=4
#     )

#     post_reply_reaction_1_post_reply_5 = PostReplyReaction(
#         emoji="😨",
#         user_id=6,
#         post_reply_id=5
#     )

#     post_reply_reaction_2_post_reply_5 = PostReplyReaction(
#         emoji="😓",
#         user_id=10,
#         post_reply_id=5
#     )

#     post_reply_reaction_1_post_reply_6 = PostReplyReaction(
#         emoji="😱",
#         user_id=10,
#         post_reply_id=6
#     )

#     post_reply_reaction_2_post_reply_6 = PostReplyReaction(
#         emoji="😱",
#         user_id=4,
#         post_reply_id=6
#     )

#     post_reply_reaction_1_post_reply_7 = PostReplyReaction(
#         emoji="🙂",
#         user_id=8,
#         post_reply_id=7
#     )

#     post_reply_reaction_2_post_reply_7 = PostReplyReaction(
#         emoji="😁",
#         user_id=4,
#         post_reply_id=7
#     )

#     post_reply_reaction_1_post_reply_8 = PostReplyReaction(
#         emoji="🤩",
#         user_id=4,
#         post_reply_id=8
#     )

#     post_reply_reaction_2_post_reply_8 = PostReplyReaction(
#         emoji="🤩",
#         user_id=6,
#         post_reply_id=8
#     )

#     db.session.add(post_reply_reaction_1_post_reply_1)
#     db.session.add(post_reply_reaction_2_post_reply_1)
#     db.session.add(post_reply_reaction_1_post_reply_2)
#     db.session.add(post_reply_reaction_2_post_reply_2)
#     db.session.add(post_reply_reaction_1_post_reply_3)
#     db.session.add(post_reply_reaction_2_post_reply_3)
#     db.session.add(post_reply_reaction_1_post_reply_4)
#     db.session.add(post_reply_reaction_2_post_reply_4)
#     db.session.add(post_reply_reaction_1_post_reply_5)
#     db.session.add(post_reply_reaction_2_post_reply_5)
#     db.session.add(post_reply_reaction_1_post_reply_6)
#     db.session.add(post_reply_reaction_2_post_reply_6)
#     db.session.add(post_reply_reaction_1_post_reply_7)
#     db.session.add(post_reply_reaction_2_post_reply_7)
#     db.session.add(post_reply_reaction_1_post_reply_8)
#     db.session.add(post_reply_reaction_2_post_reply_8)
#     db.session.commit()

def seed_data():
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

    demo_class_1 = Class(
        student_count=5,
        class_name='Class 5-1',
        subject='Math',
        student_invite_code='4dDxP5dl',
        parent_invite_code='kL4hKiGu',
        teacher_id=demo_teacher_1.id
    )

    demo_class_2 = Class(
        student_count=5,
        class_name='Class 5-2',
        subject='Reading',
        student_invite_code='NmhbVKZF',
        parent_invite_code='QqGHDK33',
        teacher_id=demo_teacher_2.id
    )

    demo_class_3 = Class(
        student_count=5,
        class_name='Class 5-3',
        subject='Math',
        student_invite_code='4dDxP5dl',
        parent_invite_code='kL4hKiGu',
        teacher_id=demo_teacher_1.id
    )

    db.session.add(demo_class_1)
    db.session.add(demo_class_2)
    db.session.add(demo_class_3)
    db.session.commit()

    demo_student_class_1 = StudentClass(
        student_id=demo_student_1.id,
        class_id=demo_class_1.id,
        planet='mercury',
        points=10
    )

    demo_student_class_2 = StudentClass(
        student_id=demo_student_2.id,
        class_id=demo_class_1.id,
        planet='earth',
        points=9
    )

    demo_student_class_3 = StudentClass(
        student_id=demo_student_3.id,
        class_id=demo_class_1.id,
        planet='mars',
        points=8
    )

    demo_student_class_4 = StudentClass(
        student_id=demo_student_4.id,
        class_id=demo_class_1.id,
        planet='venus',
        points=7
    )

    demo_student_class_5 = StudentClass(
        student_id=demo_student_5.id,
        class_id=demo_class_1.id,
        planet='jupiter',
        points=6
    )

    demo_student_class_6 = StudentClass(
        student_id=demo_student_6.id,
        class_id=demo_class_2.id,
        planet='uranus',
        points=5
    )

    demo_student_class_7 = StudentClass(
        student_id=demo_student_7.id,
        class_id=demo_class_2.id,
        planet='pluto',
        points=4
    )

    demo_student_class_8 = StudentClass(
        student_id=demo_student_8.id,
        class_id=demo_class_2.id,
        planet='saturn',
        points=3
    )

    demo_student_class_9 = StudentClass(
        student_id=demo_student_9.id,
        class_id=demo_class_2.id,
        planet='neptune',
        points=2
    )

    demo_student_class_10 = StudentClass(
        student_id=demo_student_10.id,
        class_id=demo_class_2.id,
        planet='uranus',
        points=1
    )

    demo_student_class_11 = StudentClass(
        student_id=demo_student_11.id,
        class_id=demo_class_3.id,
        planet='earth',
        points=5
    )

    demo_student_class_12 = StudentClass(
        student_id=demo_student_12.id,
        class_id=demo_class_3.id,
        planet='jupiter',
        points=4
    )

    demo_student_class_13 = StudentClass(
        student_id=demo_student_13.id,
        class_id=demo_class_3.id,
        planet='pluto',
        points=3
    )

    demo_student_class_14 = StudentClass(
        student_id=demo_student_14.id,
        class_id=demo_class_3.id,
        planet='mars',
        points=2
    )

    demo_student_class_15 = StudentClass(
        student_id=demo_student_15.id,
        class_id=demo_class_3.id,
        planet='mercury',
        points=1
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
    db.session.add(demo_student_class_11)
    db.session.add(demo_student_class_12)
    db.session.add(demo_student_class_13)
    db.session.add(demo_student_class_14)
    db.session.add(demo_student_class_15)
    db.session.commit()

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

    lack_of_effort_1 = Feedback(
        feedback_type="Lack of Effort",
        points=-1,
        class_id=1,
    )

    lack_of_effort_2 = Feedback(
        feedback_type="Lack of Effort",
        points=-1,
        class_id=2,
    )

    missing_homework_1 = Feedback(
        feedback_type="Missing Homework",
        points=-2,
        class_id=1,
    )

    missing_homework_2 = Feedback(
        feedback_type="Missing Homework",
        points=-2,
        class_id=2,
    )

    disrupting_class_1 = Feedback(
        feedback_type="Disruptive Behavior",
        points=-3,
        class_id=1,
    )

    disrupting_class_2 = Feedback(
        feedback_type="Disruptive Behavior",
        points=-3,
        class_id=2,
    )

    db.session.add(lack_of_effort_1)
    db.session.add(lack_of_effort_2)
    db.session.add(missing_homework_1)
    db.session.add(missing_homework_2)
    db.session.add(disrupting_class_1)
    db.session.add(disrupting_class_2)
    db.session.commit()

    message_board_class_1 = MessageBoard(
        permission="teacher_and_student",
        class_id=1
    )

    message_board_class_2 = MessageBoard(
        permission="teacher_only",
        class_id=2
    )

    message_board_class_3 = MessageBoard(
        permission="students_partial",
        class_id=3
    )

    db.session.add(message_board_class_1)
    db.session.add(message_board_class_2)
    db.session.add(message_board_class_3)
    db.session.commit()

    post_1_message_board_1 = Post(
        text_field="Good morning class! Ready for another awesome day of school?",
        user_id=1,
        message_board_id=1
    )

    post_2_message_board_1 = Post(
        text_field="What's your favorite fortnite skin?",
        user_id=1,
        message_board_id=1
    )

    post_1_message_board_2 = Post(
        text_field="Make sure to complete today's homework class!",
        user_id=2,
        message_board_id=2
    )

    post_2_message_board_2 = Post(
        text_field="Don't forget to bring in picture day money for tomorrow",
        user_id=2,
        message_board_id=2
    )

    post_1_message_board_3 = Post(
        text_field="Hope everyone had a great weekend! We'll be having presentations today after lunch, so make sure you're prepared.",
        user_id=1,
        message_board_id=3
    )

    post_2_message_board_3 = Post(
        text_field="Remember that we're off this Thursday!",
        user_id=1,
        message_board_id=3
    )

    db.session.add(post_1_message_board_1)
    db.session.add(post_2_message_board_1)
    db.session.add(post_1_message_board_2)
    db.session.add(post_2_message_board_2)
    db.session.add(post_1_message_board_3)
    db.session.add(post_2_message_board_3)
    db.session.commit()

    post_reply_1_post_1 = PostReply(
        text_field="Hellooooo",
        user_id=3,
        post_id=1
    )

    post_reply_2_post_1 = PostReply(
        text_field="Not really but w/e",
        user_id=5,
        post_id=1
    )

    post_reply_1_post_2 = PostReply(
        text_field="John Cena, duh",
        user_id=3,
        post_id=2
    )

    post_reply_2_post_2 = PostReply(
        text_field="I like the banana",
        user_id=7,
        post_id=2
    )

    post_reply_1_post_5 = PostReply(
        text_field="I'M NERVOUS",
        user_id=4,
        post_id=5
    )

    post_reply_2_post_5 = PostReply(
        text_field="oh no, I forgot...",
        user_id=8,
        post_id=5
    )

    post_reply_1_post_6 = PostReply(
        text_field="YAY NO SCHOOL",
        user_id=6,
        post_id=6
    )

    post_reply_2_post_6 = PostReply(
        text_field="Anyone else going to be playing roblox this weekend?",
        user_id=10,
        post_id=6
    )

    db.session.add(post_reply_1_post_1)
    db.session.add(post_reply_2_post_1)
    db.session.add(post_reply_1_post_2)
    db.session.add(post_reply_2_post_2)
    db.session.add(post_reply_1_post_5)
    db.session.add(post_reply_2_post_5)
    db.session.add(post_reply_1_post_6)
    db.session.add(post_reply_2_post_6)
    db.session.commit()

    post_reaction_1_post_1 = PostReaction(
        emoji="😀",
        user_id=7,
        post_id=1
    )

    post_reaction_2_post_1 = PostReaction(
        emoji="😩",
        user_id=9,
        post_id=1
    )

    post_reaction_1_post_2 = PostReaction(
        emoji="🤪",
        user_id=5,
        post_id=2
    )

    post_reaction_2_post_2 = PostReaction(
        emoji="😱",
        user_id=3,
        post_id=2
    )

    post_reaction_1_post_5 = PostReaction(
        emoji="😭",
        user_id=6,
        post_id=5
    )

    post_reaction_2_post_5 = PostReaction(
        emoji="😧",
        user_id=10,
        post_id=5
    )

    post_reaction_1_post_6 = PostReaction(
        emoji="🥳",
        user_id=4,
        post_id=6
    )

    post_reaction_2_post_6 = PostReaction(
        emoji="🤩",
        user_id=8,
        post_id=6
    )

    db.session.add(post_reaction_1_post_1)
    db.session.add(post_reaction_2_post_1)
    db.session.add(post_reaction_1_post_2)
    db.session.add(post_reaction_2_post_2)
    db.session.add(post_reaction_1_post_5)
    db.session.add(post_reaction_2_post_5)
    db.session.add(post_reaction_1_post_6)
    db.session.add(post_reaction_2_post_6)
    db.session.commit()

    post_reply_reaction_1_post_reply_1 = PostReplyReaction(
        emoji="🤓",
        user_id=7,
        post_reply_id=1
    )

    post_reply_reaction_2_post_reply_1 = PostReplyReaction(
        emoji="😆",
        user_id=9,
        post_reply_id=1
    )

    post_reply_reaction_1_post_reply_2 = PostReplyReaction(
        emoji="🤣",
        user_id=3,
        post_reply_id=2
    )

    post_reply_reaction_2_post_reply_2 = PostReplyReaction(
        emoji="😬",
        user_id=5,
        post_reply_id=2
    )

    post_reply_reaction_1_post_reply_3 = PostReplyReaction(
        emoji="😎",
        user_id=3,
        post_reply_id=3
    )

    post_reply_reaction_2_post_reply_3 = PostReplyReaction(
        emoji="😎",
        user_id=9,
        post_reply_id=3
    )

    post_reply_reaction_1_post_reply_4 = PostReplyReaction(
        emoji="😂",
        user_id=9,
        post_reply_id=4
    )

    post_reply_reaction_2_post_reply_4 = PostReplyReaction(
        emoji="🤮",
        user_id=5,
        post_reply_id=4
    )

    post_reply_reaction_1_post_reply_5 = PostReplyReaction(
        emoji="😨",
        user_id=6,
        post_reply_id=5
    )

    post_reply_reaction_2_post_reply_5 = PostReplyReaction(
        emoji="😓",
        user_id=10,
        post_reply_id=5
    )

    post_reply_reaction_1_post_reply_6 = PostReplyReaction(
        emoji="😱",
        user_id=10,
        post_reply_id=6
    )

    post_reply_reaction_2_post_reply_6 = PostReplyReaction(
        emoji="😱",
        user_id=4,
        post_reply_id=6
    )

    post_reply_reaction_1_post_reply_7 = PostReplyReaction(
        emoji="🙂",
        user_id=8,
        post_reply_id=7
    )

    post_reply_reaction_2_post_reply_7 = PostReplyReaction(
        emoji="😁",
        user_id=4,
        post_reply_id=7
    )

    post_reply_reaction_1_post_reply_8 = PostReplyReaction(
        emoji="🤩",
        user_id=4,
        post_reply_id=8
    )

    post_reply_reaction_2_post_reply_8 = PostReplyReaction(
        emoji="🤩",
        user_id=6,
        post_reply_id=8
    )

    db.session.add(post_reply_reaction_1_post_reply_1)
    db.session.add(post_reply_reaction_2_post_reply_1)
    db.session.add(post_reply_reaction_1_post_reply_2)
    db.session.add(post_reply_reaction_2_post_reply_2)
    db.session.add(post_reply_reaction_1_post_reply_3)
    db.session.add(post_reply_reaction_2_post_reply_3)
    db.session.add(post_reply_reaction_1_post_reply_4)
    db.session.add(post_reply_reaction_2_post_reply_4)
    db.session.add(post_reply_reaction_1_post_reply_5)
    db.session.add(post_reply_reaction_2_post_reply_5)
    db.session.add(post_reply_reaction_1_post_reply_6)
    db.session.add(post_reply_reaction_2_post_reply_6)
    db.session.add(post_reply_reaction_1_post_reply_7)
    db.session.add(post_reply_reaction_2_post_reply_7)
    db.session.add(post_reply_reaction_1_post_reply_8)
    db.session.add(post_reply_reaction_2_post_reply_8)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_reply_reactions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_replies RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_reactions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.message_boards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.feedback RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.student_class RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_reply_reactions"))
        db.session.execute(text("DELETE FROM post_replies"))
        db.session.execute(text("DELETE FROM post_reactions"))
        db.session.execute(text("DELETE FROM posts"))
        db.session.execute(text("DELETE FROM message_boards"))
        db.session.execute(text("DELETE FROM feedback"))
        db.session.execute(text("DELETE FROM rewards"))
        db.session.execute(text("DELETE FROM student_class"))
        db.session.execute(text("DELETE FROM classes"))
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
