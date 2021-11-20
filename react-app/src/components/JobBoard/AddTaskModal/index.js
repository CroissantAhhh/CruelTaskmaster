import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal"
import { addTask } from "../../../store/tasks";
import { updateSection } from "../../../store/sections";
import { useJobPage } from '../../../context/JobPageContext';


export default function AddTaskModal({ sections }) {
    const dispatch = useDispatch();
    const { jobHash } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskSection, setTaskSection] = useState();
    const [taskDetails, setTaskDetails] = useState("");
    const [validationError, setValidationError] = useState(false);
    const jobs = useSelector(state => Object.values(state.jobs));
    const currentJob = jobs?.find(job => job.hashedId === jobHash)

    const { jobPageInfo, setJobPageInfo, addTaskToBoard } = useJobPage();

    async function postTask(e) {
        e.preventDefault();
        const targetSectionId = taskSection.split(",")[0];
        const targetSectionTitle = taskSection.split(",")[1]

        const newTaskForm = {
            sectionId: targetSectionId,
            title: taskTitle,
            status: targetSectionTitle,
            details: taskDetails,
        };

        const newTask = await dispatch(addTask(newTaskForm));
        const response = await fetch(`/api/sections/${targetSectionId}`);
        const updatedSection = await response.json();
        const newTaskOrder = updatedSection.taskOrder;
        newTaskOrder.push(newTask.id);

        await dispatch(updateSection({
            id: targetSectionId,
            taskOrder: newTaskOrder.join("<>")
        }));
        addTaskToBoard(newTask);

        setTaskTitle("");
        setTaskSection();
        setTaskDetails("");
        setShowModal(false);
    }

    console.log(jobPageInfo);

    return (
        <>
            <div className="add-task-modal">
                <button className="add-task-button" onClick={() => setShowModal(true)}>Add Task</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
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
                            <label htmlFor="task-status">Status</label>
                            <select name="task-status" id="task-status" onChange={e => setTaskSection(e.target.value)}>
                                {sections.map(section => (
                                    <option value={[section.id, section.title]} key={section.id}>{section.title}</option>
                                ))}
                            </select>
                            <label htmlFor="task-details">Details</label>
                            <input id="task-details" type="textarea" value={taskDetails} onChange={e => setTaskDetails(e.target.value)}></input>
                            <button className="task-form-submit" type="submit" disabled={!taskTitle}>Create</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
