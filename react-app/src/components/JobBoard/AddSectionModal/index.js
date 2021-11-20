import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { useJobPage } from '../../../context/JobPageContext';
import { useParams } from 'react-router-dom';
import { addSection } from '../../../store/sections';
import { updateJob } from '../../../store/jobs';

export default function AddSectionModal() {
    const dispatch = useDispatch();
    const { addSectionToBoard } = useJobPage();
    const [showModal, setShowModal] = useState(false);
    const [sectionTitle, setSectionTitle] = useState("");
    const { jobHash } = useParams();
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find(job => job.hashedId === jobHash);

    async function postSection(e) {
        e.preventDefault();

        const newSectionForm = {
            jobId: currentJob?.id,
            title: sectionTitle,
            taskOrder: "",
        }

        const newSection = await dispatch(addSection(newSectionForm));
        const response = await fetch(`/api/jobs/${jobHash}`);
        const updatedJob = await response.json();
        const newSectionOrder = updatedJob.sectionOrder;
        newSectionOrder.push(newSection.id);

        await dispatch(updateJob({
            id: currentJob?.id,
            sectionOrder: newSectionOrder.join("<>"),
        }));
        addSectionToBoard(newSection);

        setSectionTitle("");
        setShowModal(false);
    }

    return (
        <>
            <div className="add-section-modal">
                <button className="add-section-button" onClick={() => setShowModal(true)}>Add Section</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="add-section-form-container">
                        <form className="add-section-form" onSubmit={postSection}>
                            <p className="add-section-title">Create New Section</p>
                            <label htmlFor="section-title">Title</label>
                            <input id="section-title" type="text" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)}></input>
                            <button className="section-form-submit" type="submit" disabled={!sectionTitle}>Create</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
