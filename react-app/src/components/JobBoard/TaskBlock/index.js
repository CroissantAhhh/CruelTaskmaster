import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { useJobPage } from "../../../context/JobPageContext";
import { updateTask, removeTask } from '../../../store/tasks';
import DeleteConfirmationModal from '../../DeleteConfirmationModal';
import "./TaskBlock.css";
import { updateSection } from '../../../store/sections';

export default function TaskBlock({ task, index }) {
    const dispatch = useDispatch();
    const { jobPageInfo, setJobPageInfo } = useJobPage();
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDetails, setEditingDetails] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDetails, setTaskDetails] = useState(task.details);
    const [validationError, setValidationError] = useState(false);
    const [taskDetailStyle, setTaskDetailStyle] = useState({
        display: "none",
        height: "400px",
        width: "300px",
        position: "fixed",
        zIndex: "20",
        padding: "30px",
        borderRadius: "30px",
        backgroundColor: "#633B1D",
        border: "10px solid black",
    });

    async function editTaskTitle(e) {
        e.preventDefault();

        if (!taskTitle) return setValidationError(true);

        const updatedTask = await dispatch(updateTask({
            id: task.id.split("-")[2],
            title: taskTitle
        }));
        setJobPageInfo({
            ...jobPageInfo,
            tasks: {
                ...jobPageInfo.tasks,
                [task.id]: {
                    ...jobPageInfo.tasks[task.id],
                    title: taskTitle,
                }
            }
        });
        setTaskTitle(updatedTask.title);
        closeDetail(e);
    }

    async function editTaskDetails(e) {
        e.preventDefault();

        if (taskDetails) {
            const updatedTask = await dispatch(updateTask({
                id: task.id.split("-")[2],
                details: taskDetails,
            }));
            setJobPageInfo({
                ...jobPageInfo,
                tasks: {
                    ...jobPageInfo.tasks,
                    [task.id]: {
                        ...jobPageInfo.tasks[task.id],
                        details: taskDetails,
                    }
                }
            });
            setTaskDetails(updatedTask.details);
            closeDetail(e);
        }
        return;
    }

    async function deleteTask(e) {
        await dispatch(removeTask(task.id.split("-")[2]));
        console.log(task);
        const updatedTasks = {...jobPageInfo.tasks};
        delete updatedTasks[task.id];
        const updatedSections = {...jobPageInfo.sections}
        console.log(jobPageInfo)
        updatedSections[task.sectionId].taskIds.splice(updatedSections[task.sectionId].taskIds.indexOf(task.id), 1)
        setJobPageInfo({
            ...jobPageInfo,
            sections: updatedSections,
            tasks: updatedTasks,
        });
        closeDetail(e);
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
            const leftOffset = (taskRect.left > window.innerWidth / 2) ? -380 : 380;
            const topOffset = (taskRect.top > window.innerHeight / 2) ? - 300 : 0;
            setTaskDetailStyle({
                ...taskDetailStyle,
                zIndex: 20,
                left: `${taskRect.left + leftOffset}px`,
                top: `${taskRect.top + topOffset}px`,
                display: "block"
            })
        } else {
        }
    }

    const taskDetail = (
        <div className="task-detail-pop-up" style={taskDetailStyle}>
            <div className="task-detail-pop-up-content">
                <div className="TDPU-header">
                    <p className="TDPU-title">Task Detail</p>
                    <div className="task-detail-close" onClick={e => { closeDetail(e); setValidationError(false);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="task-detail-title">
                    <div className="TDT-top">
                        <p className="task-detail-title-title">{"Task: "}</p>
                        <div className="task-detail-title-edit-toggle" onClick={() => setEditingTitle(!editingTitle)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                    </div>
                    {validationError && (
                        <div className="task-detail-title-edit-error">
                            <p>Title cannot be empty.</p>
                        </div>
                    )}
                    {!editingTitle
                        ? (
                            <p className="task-detail-title-display">{task.title}</p>
                        )
                        : (
                            <form className="task-detail-title-edit" onSubmit={editTaskTitle}>
                                <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)}></input>
                            </form>
                        )
                    }
                </div>
                <div className="task-detail-status">
                    <p className="task-detail-status-display">{"Status: " + task.status}</p>
                </div>
                <div className="task-detail-details">
                    <div className="TDD-top">
                        <p className="task-detail-details-title">{"Details: "}</p>
                        <div className="task-detail-details-edit-toggle" onClick={() => setEditingDetails(!editingDetails)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                    </div>
                    {!editingDetails
                        ? (
                            <div className="task-detail-details-display">
                                <p>{task.details}</p>
                            </div>
                        )
                        : (
                            <form className="task-detail-details-edit" onSubmit={editTaskDetails}>
                                <textarea value={taskDetails} rows="3" onChange={e => setTaskDetails(e.target.value)}></textarea>
                                <button className="TDDE-button" type="Submit">Save</button>
                            </form>
                        )}
                </div>
                <DeleteConfirmationModal deleteRequest={deleteTask} resource={task} resourceName={task.title} />
            </div>
        </div>
    )

    return (
        <>
            {task && (
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
            )}
        </>
    )
}
