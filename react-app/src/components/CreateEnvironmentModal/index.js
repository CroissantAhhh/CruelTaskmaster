import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from "../../context/Modal";
import { addEnvironment } from "../../store/environments";
import "./CreateEnvironmentModal.css";

export default function CreateEnvironmentModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [envTitle, setEnvTitle] = useState("");
    const [envDesc, setEnvDesc] = useState("");
    const [showError, setShowError] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    async function createEnvironment(e) {
        e.preventDefault();
        const newEnvForm = {
            userId: sessionUser?.id,
            title: envTitle,
            description: envDesc,
        }

        if (!envTitle) {
            return setShowError(true);
        }

        const newEnv = await dispatch(addEnvironment(newEnvForm));
        history.push(`/environments/${newEnv?.hashedId}`);
    }

    return (
        <>
            <div className="create-new-environment-section" onClick={() => setShowModal(true)}>
                <p className="create-new-environment-title">Create New Environment</p>
                <button className="create-new-environment-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{transform: "rotate(360deg)"}}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="create-new-environment-form-container">
                        <p className="create-new-environment-form-header">Create New Environment</p>
                        {showError && (
                            <p className="new-env-error">Title Required.</p>
                        )}
                        <form className="create-new-environment-form" onSubmit={createEnvironment}>
                            <label htmlFor="new-environment-title">{"Title: (Required) "}</label>
                            <input id="new-environment-title" type="text" value={envTitle} onChange={e => setEnvTitle(e.target.value)}></input>
                            <label htmlFor="new-environment-desc">{"Description: (Optional)"}</label>
                            <input id="new-environment-desc" type="textarea" value={envDesc} onChange={e => setEnvDesc(e.target.value)}></input>
                            <button className="create-new-environment-submit" type="submit">Create</button>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
