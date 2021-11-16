from os import environ
from werkzeug.security import generate_password_hash
from app.models import db, User, Environment, Job, Task
import datetime as dt
from random import randint, choice, sample
from faker import Faker
import json

fake = Faker()

# loads json data
with open('app/seeds/message_data.json') as json_file:
    data = json.load(json_file)
messages = data['messages']
replacements = data['replacements']
# default counts
total_users = 30
total_servers = 20
channels_per_server = 7
total_channels = total_servers*channels_per_server


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
        description='Everything related to career, job searching, resume and portfolio work, personal projects, actual work tasks (hopefully eventually)',
    )
    fit_env = Environment(
        user_id=1,
        title='Health and Fitness',
        description='Anything related to my physical health, will mostly pertain to exercise and diet'
    )
    gaming_env = Environment(
        user_id=1,
        title='Gaming',
        description='Gaming related objectives'
    )
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
        description='Continuation of work and development of features on my React solo project, Avatune'
    )
    env1_j2 = Job(
        environment_id=1,
        title='Portfolio',
        description='Work on documentation and presenting of my web-related projects, fleshed out READMEs, links and visuals on my LinkedIn'
    )
    env1_j3 = Job(
        environment_id=1,
        title='Networking',
        description='Social outreaching, looking for people who may introduce me to desirable career prospects and opportunities'
    )
    env1_j4 = Job(
        environment_id=1,
        title='Cruel Taskmaster',
        description='Continuation of work and development of features on my solo capstone project, Cruel Taskmaster'
    )
    env2_j1 = Job(
        environment_id=2,
        title='Weekly Exercise',
        description='Weekly workout and exercise plan'
    )
    env2_j2 = Job(
        environment_id=2,
        title='Weekly Meal Plan',
        description='Weekly dieting plan'
    )
    env3_j1 = Job(
        environment_id=3,
        title='TFT',
        description='Objectives and goals related to TFT'
    )
    env3_j2 = Job(
        environment_id=3,
        title='Animal Crossing',
        description='Objectives and goals related to Animal Crossing'
    )
    env3_j3 = Job(
        environment_id=3,
        title='Minecraft',
        description='Objectives and goals related to Minecraft'
    )
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

def seed_tasks():
    '''
    Seeds the tasks table.
    '''
    job1_task1 = Task(
        job_id=1,
        title='Implement adding to any playlist',
        status='In Progress',
        details='Finished adding tracks to the specific Your Songs playlist, now need to generalize functionality to all of users playlists',
    )
    job1_task2 = Task(
        job_id=1,
        title='Restyling',
        status='To-do',
        details='Site still looks a bit blocky, tacky, unsatisfactory, plenty of re-styling to be done in order to give the site a more clean look'
    )
    job1_task3 = Task(
        job_id=1,
        title='Revamp home page',
        status='To-do',
        details='Current home page only displays a random selection of songs, perhaps implement logic to recommend songs based on currently liked songs'
    )
    job1_task4 = Task(
        job_id=1,
        title='Implement track queue page',
        details='Page that displays currently playing song, along with the songs that will play afterwards, in the correct order'
    )
    job2_task1 = Task(
        job_id=2,
    )

def seed_all():
    '''
    Seeds all models.
    '''
    seed_user()
    seed_server()
    seed_user_server()
    seed_channel()
    seed_message()
    seed_friends()


def undo_all():
    '''
    Undos all seeded models.
    '''
    db.session.execute(f'TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE user_servers RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.execute(f'TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


if __name__ == '__main__':
    seed_message()
