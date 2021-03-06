import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal"
import { addTask } from "../../../store/tasks";
import { updateSection } from "../../../store/sections";
import { useJobPage } from '../../../context/JobPageContext';
import "./AddTaskModal.css";


export default function AddTaskModal({ section }) {
    const dispatch = useDispatch();
    const { jobHash } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDetails, setTaskDetails] = useState("");
    const [validationError, setValidationError] = useState(false);
    const jobs = useSelector(state => Object.values(state.jobs));
    const currentJob = jobs?.find(job => job.hashedId === jobHash)

    const { addTaskToBoard } = useJobPage();

    async function postTask(e) {
        e.preventDefault();

        const newTaskForm = {
            sectionId: section.id.split("-")[2],
            title: taskTitle,
            status: section.title,
            details: taskDetails,
        };

        if (!taskTitle) return setValidationError(true);

        const newTask = await dispatch(addTask(newTaskForm));
        // const response = await fetch(`/api/sections/${section.id.split("-")[2]}`);
        // const updatedSection = await response.json();
        // const newTaskOrder = updatedSection.taskOrder;
        // newTaskOrder.push(newTask.id);

        // await dispatch(updateSection({
        //     id: section.id.split("-")[2],
        //     taskOrder: newTaskOrder.join("<>")
        // }));
        addTaskToBoard(newTask);

        setTaskTitle("");
        setTaskDetails("");
        setShowModal(false);
    }

    return (
        <>
            <div className="add-task-modal" onClick={() => { setShowModal(true); setValidationError(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            {showModal && (
                <Modal onClose={() => { setShowModal(false); setValidationError(false); }}>
                    <div className="add-task-form-container">
                        <form className="add-task-form" onSubmit={postTask}>
                            <p className="add-task-title">Create New Task</p>
                            {validationError && (
                                <div className="form-error">
                                    <p>Please provide a title.</p>
                                </div>
                            )}
                            <label htmlFor="task-title">Title</label>
                            <input id="task-title" type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)}></input>
                            <label htmlFor="task-details">Details</label>
                            <textarea id="task-details" rows="4" value={taskDetails} onChange={e => setTaskDetails(e.target.value)}></textarea>
                            <button className="task-form-submit" type="submit" disabled={!taskTitle}>Create</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
