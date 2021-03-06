import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { updateJob } from '../../store/jobs';

import "./EditJobModal.css";


export default function EditJobModal({ job }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [jobTitle, setJobTitle] = useState(job.title);
    const [jobDescription, setJobDescription] = useState(job.description);
    const [showError, setShowError] = useState(false);

    async function editJob(e) {
        e.preventDefault();
        setShowError(false);
        const updatedJobForm = {
            id: job.id,
            title: jobTitle,
            description: jobDescription,
        }

        if (!jobTitle) return setShowError(true);

        const updatedJob = await dispatch(updateJob(updatedJobForm));
        setShowModal(false);
        setJobTitle(updatedJob.title);
        setJobDescription(updatedJob.description);
    }

    return (
        <>
            <div className="edit-job-button-content" onClick={() => { setShowModal(true); setShowError(false); setJobTitle(job.title) }}>
                <p className="edit-job-button text">Edit&nbsp;</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" width="50px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </div>
            {showModal && (
                <Modal onClose={() => { setShowModal(false); setShowError(false); setJobTitle(job.title) }}>
                    <div className="edit-job-form-container">
                        <p className="edit-job-form-header"></p>
                        <form className="edit-job-form" onSubmit={editJob}>
                            <p className="edit-job-form-header">Edit {job.title}</p>
                            {showError && (
                                <p className="edit-job-error">Title cannot be blank</p>
                            )}
                            <label htmlFor="edit-job-form-title">{"Title: "}</label>
                            <input id="edit-job-form-title" type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}></input>
                            <label htmlFor="edit-job-form-description">{"Description: "}</label>
                            <textarea id="edit-job-form-description" rows="5" value={jobDescription} onChange={e => setJobDescription(e.target.value)}></textarea>
                            <button className="edit-job-form-submit" type="submit">Edit</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
