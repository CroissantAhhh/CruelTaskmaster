import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { updateTask } from '../../../store/tasks';
import "./TaskBlock.css";

export default function TaskBlock({ task, index }) {
    const dispatch = useDispatch();
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDetails, setEditingDetails] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDetails, setTaskDetails] = useState(task.details);
    const [validationError, setValidationError] = useState(false);
    const [taskDetailStyle, setTaskDetailStyle] = useState({
        display: "none",
        position: "fixed",
        zIndex: "1",
        padding: "30px",
        borderRadius: "30px",
        border: "1px solid black",
        backgroundColor: "white",
    });

    function editTaskTitle(e) {
        e.preventDefault();

        if (taskTitle) {
            dispatch(updateTask({
                id: task.id,
                title: taskTitle
            }));
        }
        return;
    }

    function editTaskDetails(e) {
        e.preventDefault();

        if (taskDetails) {
            dispatch(updateTask({
                id: task.id,
                details: taskDetails,
            }));
        }
        return;
    }

    function closeDetail(e) {
        e.stopPropagation();
        setEditingTitle(false);
        setEditingDetails(false);
        setTaskTitle(task.title);
        setTaskDetails(task.details);
        setTaskDetailStyle({
            ...taskDetailStyle,
            top: "",
            left: "",
            display: "none",
        })
    }

    function showTaskDetail(e) {
        e.stopPropagation();
        if (e.currentTarget.className === 'task-block-content') {
            const taskRect = e.currentTarget.getBoundingClientRect();
            setTaskDetailStyle({
                ...taskDetailStyle,
                left: `${taskRect.left}px`,
                top: `${taskRect.top}px`,
                display: "inline-block"
            })
        } else {
        }
    }

    const taskDetail = (
        <div className="task-detail-pop-up" style={taskDetailStyle}>
            <div className="task-detail-title">
                <p className="task-detail-title-title">{"Task: "}</p>
                {!editingTitle
                    ? (
                        <p className="task-detail-title-display">{task.title}</p>
                    )
                    : (
                        <form className="task-detail-title-edit" onSubmit={editTaskTitle}>
                            <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)}></input>
                            {validationError && (
                                <div className="task-detail-title-edit-error">
                                    <p>Title cannot be empty.</p>
                                </div>
                            )}
                        </form>
                    )
                }
                <button className="task-detail-title-edit-toggle" onClick={() => setEditingTitle(!editingTitle)}>Edit</button>
            </div>
            <div className="task-detail-status">
                <p className="task-detail-status-display">{"Status: " + task.status}</p>
            </div>
            <div className="task-detail-details">
                <p className="task-detail-details-title">{"Details: "}</p>
                <button className="task-detail-details-edit-toggle" onClick={() => setEditingDetails(!editingDetails)}>Edit</button>
                {editingDetails
                    ? (
                        <p className="task-detail-details-display">{task.details}</p>
                    )
                    : (
                        <form className="task-detail-details-edit" onSubmit={editTaskDetails}>
                            <input type="textarea" value={taskDetails} onChange={e => setTaskDetails(e.target.value)}></input>
                            {validationError && (
                                <div className="task-detail-title-edit-error">
                                    <p>Title cannot be empty.</p>
                                </div>
                            )}
                        </form>
                    )}
            </div>
            <button className="task-detail-close" onClick={e => closeDetail(e)}>x</button>
        </div>
    )

    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <div id={task.id} className="task-block" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="task-block-content" onClick={e => showTaskDetail(e)}>
                        <div className="task-block-body">
                            <p className="task-block-title">{task.title}</p>
                        </div>
                    </div>
                    {taskDetail}
                </div>
            )}
        </Draggable>
    )
}
