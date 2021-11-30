from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Job, Section, Task

section_routes = Blueprint('sections', __name__)


@section_routes.route('/<section_id>')
@login_required
def get_section(section_id):
    section = Section.query.get(section_id)
    return section.to_dict()

@section_routes.route('/byJob/<job_hash>')
@login_required
def job_sections(job_hash):
    job = Job.query.filter(Job.hashed_id == job_hash).one()
    sections = Section.query.filter(Section.job_id == job.id).all()
    return {'sections': [section.to_dict() for section in sections]}


@section_routes.route('/', methods=['POST'])
@login_required
def post_section():
    data = request.json
    section = Section(
        job_id = data["jobId"],
        title = data["title"],
        task_order = ""
    )
    db.session.add(section)
    parent_job = Job.query.get(section.job_id)
    job_section_order = parent_job.section_order.split('<>')
    if parent_job.section_order == '':
        parent_job.section_order = str(section.id)
    else:
        job_section_order.append(str(section.id))
        parent_job.section_order = "<>".join(job_section_order)
    db.session.commit()
    return section.to_dict()

@section_routes.route('/<int:section_id>', methods=['PUT'])
@login_required
def update_section(section_id):
    section = Section.query.get(section_id)
    data = request.json
    if 'title' in data.keys():
        section.title = data["title"]
    if 'taskOrder' in data.keys():
        section.task_order = data["taskOrder"]
    if section.task_order != "":
        sto_array = section.task_order.split('<>')
        print(sto_array)
        section_tasks = []
        for task_id in sto_array:
            section_tasks.append(Task.query.get(task_id))
        print(section_tasks)
        for task in section_tasks:
            task.section_id = section.id
            task.status = section.title
    db.session.commit()
    return section.to_dict()

@section_routes.route('/<int:section_id>', methods=['DELETE'])
@login_required
def delete_section(section_id):
    section = Section.query.get(section_id)
    parent_job = section.job
    job_section_order = parent_job.section_order.split('<>')
    job_section_order.remove(str(section_id))
    if len(job_section_order) == 0:
        parent_job.section_order = ''
    else:
        parent_job.section_order = '<>'.join(job_section_order)
    db.session.delete(section)
    db.session.commit()
    return {'sectionId': section_id}
