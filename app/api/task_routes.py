from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Task

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
    db.session.commit()
    return task.to_dict()

@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def update_task(task_id):
    task = Task.query.get(task_id)
    data = request.json
    if 'title' in data.keys():
        task.title = data["title"]
    if 'status' in data.keys():
        task.status = data["status"]
    if 'description' in data.keys():
        task.details = data["details"]
    db.session.commit()
    return task.to_dict()

@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    Task.query.get(task_id).delete()
    db.session.commit()
    return {'taskId': task_id}
