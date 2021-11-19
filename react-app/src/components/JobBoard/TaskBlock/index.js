import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { updateTask } from '../../../store/tasks';
import "./TaskBlock.css";

export default function TaskBlock({ task, taskIndex }) {
    const dispatch = useDispatch();
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDetails, setEditingDetails] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDetails, setTaskDetails] = useState(task.details);
    const [validationError, setValidationError] = useState(false);

    function editTaskTitle(e) {
        e.preventDefault();

        if (taskTitle) {
            dispatch(updateTask({title: taskTitle}));
        }
        return;
    }

    function closeDetail(e) {
        setEditingTitle(false);
        setTaskTitle(task.title);
        setTaskDetails(task.details);
        setShowTaskDetail(false);
    }

    const taskDetail = (
        <div className="task-detail-pop-up">
            <div className="task-detail-title">
                <button className="task-detail-title-edit-toggle" onClick={() => setEditingTitle(!editingTitle)}>Edit</button>
                {!editingTitle && (
                    <p className="task-detail-title-display">{task.title}</p>
                )}
                {editingTitle && (
                    <form className="task-detail-title-edit" onSubmit={editTaskTitle}>
                        <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)}></input>
                        {validationError && (
                            <div className="task-detail-title-edit-error">
                                <p>Title cannot be empty.</p>
                            </div>
                        )}
                    </form>
                )}
            </div>
            <div className="task-detail-status">
                <p className="task-detail-status-display">{task.status}</p>
            </div>
            <div className="task-detail-details">
                {!editingDetails && (
                    <p className="task-detail-details-display">{task.details}</p>
                )}
            </div>
            <button className="task-detail-close" onClick={closeDetail}>x</button>
        </div>
    )

    return (
        <Draggable draggableId={task.id} index={taskIndex}>
            {provided => (
                <div id={task.id} className="task-block" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="task-block-content">
                        <div className="task-block-body" onClick={() => setShowTaskDetail(true)}>
                            <p className="task-block-title">{task.title}</p>
                        </div>
                        {showTaskDetail && taskDetail}
                    </div>
                </div>
            )}
        </Draggable>
    )
}
