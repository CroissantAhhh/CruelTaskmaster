import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { addJob } from "../../store/jobs";
import { addJobToEnv } from '../../store/environments';
import { Modal } from '../../context/Modal'
import "./CreateJobModal.css";

export default function CreateJobModal({ envId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { environmentHash } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [showError, setShowError] = useState(false);

    async function createJob(e) {
        e.preventDefault();
        setShowError(false);
        const newJobForm = {
            environmentHash,
            title: jobTitle,
            description: jobDescription,
        }

        if (!jobTitle) return setShowError(true);

        const newJob = await dispatch(addJob(newJobForm));
        await dispatch(addJobToEnv(envId, newJob));
        history.push(`/jobs/${newJob.hashedId}`);
    }

    return (
        <>
            <div className="create-new-job-button" onClick={() => setShowModal(true)}>
                <p>Create New Job&nbsp;&nbsp;</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{transform: "rotate(360deg)"}}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="create-job-form-container">
                        <form className="create-job-form" onSubmit={createJob}>
                            <p className="create-job-form-header">Create New Job</p>
                            {showError && (
                                <p className="new-job-error">Title Required</p>
                            )}
                            <label htmlFor="create-job-form-title">{"Title: "}</label>
                            <input id="create-job-form-title" type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}></input>
                            <label htmlFor="create-job-form-description">{"Description: (Optional)"}</label>
                            <input id="create-job-form-details" type="textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)}></input>
                            <button className="create-job-form-submit" type="submit">Create</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
