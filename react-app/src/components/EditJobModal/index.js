import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { updateJob } from '../../store/jobs';


export default function EditJobModal({ job }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [jobTitle, setJobTitle] = useState(job.title);
    const [jobDescription, setJobDescription] = useState(job.description);

    async function editJob(e) {
        e.preventDefault();
        const updatedJobForm = {
            id: job.id,
            title: jobTitle,
            description: jobDescription,
        }
        const updatedJob = await dispatch(updateJob(updatedJobForm));
        setShowModal(false);
        setJobTitle(updatedJob.title);
        setJobDescription(updatedJob.description);
    }

    return (
        <>
            <button className="edit-job-modal-button" onClick={() => setShowModal(true)}>...</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="edit-job-form-container">
                        <p className="edit-job-form-header"></p>
                        <form className="edit-job-form" onSubmit={editJob}>
                            <label htmlFor="edit-job-form-title">{"Title: "}</label>
                            <input id="edit-job-form-title" type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}></input>
                            <label htmlFor="edit-job-form-description">{"Description: "}</label>
                            <input id="edit-job-form-description" type="textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)}></input>
                            <button className="edit-job-form-submit" type="submit">Edit</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
