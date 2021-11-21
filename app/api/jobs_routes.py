from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Job, Section, Task
import random
import string

job_routes = Blueprint('jobs', __name__)

def generate_hash_id():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

@job_routes.route('/byEnvironment/<int:environment_id>')
@login_required
def environment_jobs(environment_id):
    jobs = Job.query.filter(Job.environment_id == environment_id).all()
    return {'jobs': [job.to_dict() for job in jobs]}

@job_routes.route('/<job_hash>')
@login_required
def get_one_job(job_hash):
    job = Job.query.filter(Job.hashed_id == job_hash).one()
    return job.to_dict()

@job_routes.route('/full/<job_hash>')
@login_required
def get_job_full(job_hash):
    job = Job.query.filter(Job.hashed_id == job_hash).one()
    job_section_order = job.section_order.split('<>')
    job_sections = []
    job_tasks = []
    for jso in job_section_order:
        job_section = Section.query.get(jso).to_dict()
        job_sections.append(job_section)
        for sto in job_section["taskOrder"]:
            section_task = Task.query.get(sto).to_dict()
            job_tasks.append(section_task)

    return {
        'job': job.to_dict(),
        'sections': job_sections,
        'tasks': job_tasks,
    }


@job_routes.route('/', methods=['POST'])
@login_required
def post_job():
    data = request.json
    job = Job(
        environment_id = data["environmentId"],
        hashed_id = generate_hash_id(),
        title = data["title"],
        description = data["description"],
    )
    db.session.add(job)
    TD = Section(
        job_id = job.id,
        title = 'To-do',
        taskOrder = '',
    )
    IP = Section(
        job_id = job.id,
        title = 'In Progress',
        taskOrder = '',
    )
    C = Section(
        job_id = job.id,
        title = 'Complete',
        taskOrder = '',
    )
    db.session.add(TD)
    db.session.add(IP)
    db.session.add(C)
    db.session.commit()
    return job.to_dict()

@job_routes.route('/<int:job_id>', methods=['PUT'])
@login_required
def update_job(job_id):
    job = Job.query.get(job_id)
    data = request.json
    if 'title' in data.keys():
        job.title = data["title"]
    if 'description' in data.keys():
        job.description = data["description"]
    if 'sectionOrder' in data.keys():
        job.section_order = data["sectionOrder"]
    db.session.commit()
    return job.to_dict()

@job_routes.route('/<int:job_id>', methods=['DELETE'])
@login_required
def delete_job(job_id):
    Job.query.get(job_id).delete()
    db.session.commit()
    return {'jobId': job_id}
