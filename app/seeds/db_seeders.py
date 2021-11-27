from os import environ
from werkzeug.security import generate_password_hash
from app.models import db, User, Environment, Job, Section, Task
import datetime as dt
from random import randint, choice, sample
import json

banners = [
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971507/banners/banner3_vk9nby.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971507/banners/banner9_mqqi9h.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971508/banners/banner4_d0fyne.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971508/banners/banner2_neeaxg.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971505/banners/banner7_w8fa6i.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971505/banners/banner5_cxud1a.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971506/banners/banner10_wa6vc6.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971504/banners/banner6_bdksig.jpg",
        "https://res.cloudinary.com/dmtj0amo0/image/upload/v1637971504/banners/banner8_buf9zs.jpg",
    ]


def seed_users():
    '''
    Seeds the users table.
    '''
    jason = User(
        username='Jason Zhou', email='jasonzhou8597@gmail.com', password='jasonzhou2')

    db.session.add(jason)

    db.session.commit()


def seed_environments():
    '''
    Seeds the environments table.
    '''

    job_env = Environment(
        user_id=1,
        title='Career',
        banner=choice(banners),
        description='Everything related to career, job searching, resume and portfolio work, personal projects, actual work tasks (hopefully eventually)',
    )
    fit_env = Environment(
        user_id=1,
        title='Health and Fitness',
        banner=choice(banners),
        description='Anything related to my physical health, will mostly pertain to exercise and diet'
    )
    gaming_env = Environment(
        user_id=1,
        title='Gaming',
        banner=choice(banners),
        description='Gaming related objectives'
    )
    job_env.set_hashed_id()
    fit_env.set_hashed_id()
    gaming_env.set_hashed_id()
    db.session.add(job_env)
    db.session.add(fit_env)
    db.session.add(gaming_env)
    db.session.commit()


def seed_jobs():
    '''
    Seeds the jobs table.
    '''
    env1_j1 = Job(
        environment_id=1,
        title='Avatune',
        banner=choice(banners),
        description='Continuation of work and development of features on my React solo project, Avatune',
        section_order='',
    )
    env1_j2 = Job(
        environment_id=1,
        title='Portfolio',
        banner=choice(banners),
        description='Work on documentation and presenting of my web-related projects, fleshed out READMEs, links and visuals on my LinkedIn',
        section_order='',
    )
    env1_j3 = Job(
        environment_id=1,
        title='Networking',
        banner=choice(banners),
        description='Social outreaching, looking for people who may introduce me to desirable career prospects and opportunities',
        section_order='',
    )
    env1_j4 = Job(
        environment_id=1,
        title='Cruel Taskmaster',
        banner=choice(banners),
        description='Continuation of work and development of features on my solo capstone project, Cruel Taskmaster',
        section_order='',
    )
    env2_j1 = Job(
        environment_id=2,
        title='Weekly Exercise',
        banner=choice(banners),
        description='Weekly workout and exercise plan',
        section_order='',
    )
    env2_j2 = Job(
        environment_id=2,
        title='Weekly Meal Plan',
        banner=choice(banners),
        description='Weekly dieting plan',
        section_order='',
    )
    env3_j1 = Job(
        environment_id=3,
        title='TFT',
        banner=choice(banners),
        description='Objectives and goals related to TFT',
        section_order='',
    )
    env3_j2 = Job(
        environment_id=3,
        title='Animal Crossing',
        banner=choice(banners),
        description='Objectives and goals related to Animal Crossing',
        section_order='',
    )
    env3_j3 = Job(
        environment_id=3,
        title='Minecraft',
        banner=choice(banners),
        description='Objectives and goals related to Minecraft',
        section_order='',
    )
    env1_j1.set_hashed_id()
    env1_j2.set_hashed_id()
    env1_j3.set_hashed_id()
    env1_j4.set_hashed_id()
    env2_j1.set_hashed_id()
    env2_j2.set_hashed_id()
    env3_j1.set_hashed_id()
    env3_j2.set_hashed_id()
    env3_j3.set_hashed_id()
    db.session.add(env1_j1)
    db.session.add(env1_j2)
    db.session.add(env1_j3)
    db.session.add(env1_j4)
    db.session.add(env2_j1)
    db.session.add(env2_j2)
    db.session.add(env3_j1)
    db.session.add(env3_j2)
    db.session.add(env3_j3)
    db.session.commit()

def seed_sections():
    '''
    Seeds the tasks table.
    '''
    index = 0
    all_jobs = Job.query.all()
    for job in all_jobs:
        s_TD = Section(
            job_id=job.id,
            title='To-do',
            task_order='',
        )
        s_IP = Section(
            job_id=job.id,
            title='In Progress',
            task_order='',
        )
        s_C = Section(
            job_id=job.id,
            title='Complete',
            task_order='',
        )
        db.session.add(s_TD)
        db.session.add(s_IP)
        db.session.add(s_C)
        job.section_order = f"{index + 1}<>{index + 2}<>{index + 3}"
        db.session.commit()
        index += 3


def seed_tasks():
    '''
    Seeds the tasks table.
    '''
    job1_task1 = Task(
        section_id=2,
        title='Implement adding to any playlist',
        status='In Progress',
        details='Finished adding tracks to the specific Your Songs playlist, now need to generalize functionality to all of users playlists',
    )
    job1_task2 = Task(
        section_id=1,
        title='Restyling',
        status='To-do',
        details='Site still looks a bit blocky, tacky, unsatisfactory, plenty of re-styling to be done in order to give the site a more clean look'
    )
    job1_task3 = Task(
        section_id=1,
        title='Revamp home page',
        status='To-do',
        details='Current home page only displays a random selection of songs, perhaps implement logic to recommend songs based on currently liked songs'
    )
    job1_task4 = Task(
        section_id=1,
        title='Implement track queue page',
        status='To-do',
        details='Page that displays currently playing song, along with the songs that will play afterwards, in the correct order'
    )
    job2_task1 = Task(
        section_id=4,
        title='Update Resume',
        status="To-do",
        details='Update resume to reflect and include skills learned through App Academy',
    )
    job2_task2 = Task(
        section_id=4,
        title='Update LinkedIn',
        status="To-do",
        details="Update LinkedIn profile to reflect and include skills learned through App Academy"
    )
    job2_task3 = Task(
        section_id=4,
        title='READMEs for solo projects on GitHub',
        status='To-do',
        details="Fleshing out READMEs on project repository pages to present my websites more in depth"
    )
    job2_task4 = Task(
        section_id=4,
        title='Decorate GitHub profile',
        status="To-do",
        details="Making GitHub profile more presentable, perhaps need to change my username..."
    )
    job3_task1 = Task(
        section_id=8,
        title='Reach out to Anish for positions at Salesforce',
        status='In Progress',
        details="",
    )
    job3_task2 = Task(
        section_id=7,
        title='Reach out to 3 employees from Spotify',
        status='To-do',
        details=""
    )
    job3_task3 = Task(
        section_id=7,
        title='Reach out to 3 employees from Soundcloud',
        status='To-do',
        details="",
    )
    job3_task4 = Task(
        section_id=7,
        title="Reach out to 3 employees from Discord",
        status="To-do",
        details=""
    )
    job3_task5 = Task(
        section_id=7,
        title="Message Rodman about openings at Microsoft",
        status="To-do",
        details="",
    )
    job4_task1 = Task(
        section_id=12,
        title="models design and migration",
        status="Complete",
        details=""
    )
    job4_task2 = Task(
        section_id=11,
        title="Seed data",
        status="In Progress",
        details=""
    )
    job4_task3 = Task(
        section_id=10,
        title="Test cascading deletes",
        status="To-do",
        details=""
    )
    job4_task4 = Task(
        section_id=10,
        title="Plan out frontend components design",
        status="To-do",
        details="Figure out the most efficient modular way to design the pages and React components of the site"
    )
    job4_task5 = Task(
        section_id=10,
        title="Design logo and pick font for site name",
        status="To-do",
        details="Logo will most likely some kind of orc icon, since the site is named Cruel Taskmaster"
    )
    job4_task6 = Task(
        section_id=10,
        title="Set up React redux store",
        status="To-do",
        details="slices of state will mostly likely be session, environments, jobs, and tasks",
    )
    job4_task7 = Task(
        section_id=10,
        title="Complete skeleton code for all pages and components",
        status="To-do",
        details="finish barebones versions of all the pages and components, print relevant information on page unstyled"
    )
    job4_task8 = Task(
        section_id=10,
        title="Set up routing",
        status="To-do",
        details=""
    )
    job4_task9 = Task(
        section_id=12,
        title="Stop working on seed data for now and actually start on the site",
        status="Complete",
        details=""
    )
    db.session.add(job1_task1)
    db.session.add(job1_task2)
    db.session.add(job1_task3)
    db.session.add(job1_task4)
    db.session.add(job2_task1)
    db.session.add(job2_task2)
    db.session.add(job2_task3)
    db.session.add(job2_task4)
    db.session.add(job3_task1)
    db.session.add(job3_task2)
    db.session.add(job3_task3)
    db.session.add(job3_task4)
    db.session.add(job3_task5)
    db.session.add(job4_task1)
    db.session.add(job4_task2)
    db.session.add(job4_task3)
    db.session.add(job4_task4)
    db.session.add(job4_task5)
    db.session.add(job4_task6)
    db.session.add(job4_task7)
    db.session.add(job4_task8)
    db.session.add(job4_task9)
    sec1 = Section.query.get(1)
    sec1.task_order = '2<>3<>4'
    sec2 = Section.query.get(2)
    sec2.task_order = '1'
    sec4 = Section.query.get(4)
    sec4.task_order = '8<>5<>6<>7'
    sec7 = Section.query.get(7)
    sec7.task_order = '12<>10<>11<>13'
    sec8 = Section.query.get(8)
    sec8.task_order = '9'
    sec10 = Section.query.get(10)
    sec10.task_order = '18<>19<>20<>21<>16<>17'
    sec11 = Section.query.get(11)
    sec11.task_order = '15'
    sec12 = Section.query.get(12)
    sec12.task_order = '22<>14'
    db.session.commit()


def seed_all():
    '''
    Seeds all models.
    '''
    seed_users()
    seed_environments()
    seed_jobs()
    seed_sections()
    seed_tasks()


def undo_all():
    '''
    Undos all seeded models.
    '''
    db.session.execute(f'TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE jobs RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE environments RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
