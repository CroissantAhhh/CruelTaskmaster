from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Job, Section

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
    db.session.commit()
    return section.to_dict()

@section_routes.route('/<int:section_id>', methods=['DELETE'])
@login_required
def delete_section(section_id):
    Section.query.get(section_id).delete()
    db.session.commit()
    return {'sectionId': section_id}
