from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Task, Section

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/bySection/<int:section_id>')
@login_required
def section_tasks(section_id):
    tasks = Task.query.filter(Task.section_id == section_id).all()
    return {'tasks': [task.to_dict() for task in tasks]}


@task_routes.route('/', methods=['POST'])
@login_required
def post_task():
    data = request.json
    print(data)
    task = Task(
        section_id = data["sectionId"],
        title = data["title"],
        status = data["status"],
        details = data["details"],
    )
    db.session.add(task)
    parent_section = Section.query.get(task.section_id)
    section_task_order = parent_section.task_order.split('<>')
    if len(section_task_order) == 0:
        parent_section.task_order = str(task.id)
    else:
        section_task_order.append(str(task.id))
        parent_section.task_order = '<>'.join(section_task_order)
    db.session.commit()
    return task.to_dict()

@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def update_task(task_id):
    task = Task.query.get(task_id)
    data = request.json
    if 'title' in data.keys():
        task.title = data["title"]
    if 'sectionId' in data.keys():
        task.section_id = str(data["sectionId"])
    if 'status' in data.keys():
        task.status = data["status"]
    if 'details' in data.keys():
        task.details = data["details"]
    db.session.commit()
    return task.to_dict()

@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    task = Task.query.get(task_id)
    parent_section = Section.query.filter(Section.id == task.section_id).one()
    section_task_order = parent_section.task_order.split("<>")
    print(section_task_order)
    section_task_order.remove(str(task_id));
    if len(section_task_order) == 0:
        parent_section.task_order = ''
    else:
        parent_section.task_order = "<>".join(section_task_order)
    db.session.delete(task)
    db.session.commit()
    return {'taskId': task_id}
