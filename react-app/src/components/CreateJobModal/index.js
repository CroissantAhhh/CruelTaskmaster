import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { addJob } from "../../store/jobs";
import { addJobToEnv } from '../../store/environments';
import { Modal } from '../../context/Modal'

export default function CreateJobModal({ envId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { environmentHash } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    async function createJob(e) {
        e.preventDefault();

        const newJobForm = {
            environmentHash,
            title: jobTitle,
            description: jobDescription,
        }

        const newJob = await dispatch(addJob(newJobForm));
        await dispatch(addJobToEnv(envId, newJob));
        history.push(`/jobs/${newJob.hashedId}`);
    }

    return (
        <>
            <button className="create-job-modal-button" onClick={() => setShowModal(true)}>Create New Job</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="create-job-form-container">
                        <form className="create-job-form" onSubmit={createJob}>
                            <p className="create-job-form-header">Create New Job</p>
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
