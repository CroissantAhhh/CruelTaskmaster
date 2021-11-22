import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from "../../context/Modal";
import { addEnvironment } from "../../store/environments";

export default function CreateEnvironmentModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [envTitle, setEnvTitle] = useState("");
    const [envDesc, setEnvDesc] = useState("");

    const sessionUser = useSelector(state => state.session.user);

    async function createEnvironment(e) {
        e.preventDefault();
        const newEnvForm = {
            userId: sessionUser?.id,
            title: envTitle,
            description: envDesc,
        }

        const newEnv = await dispatch(addEnvironment(newEnvForm));
        history.push(`/environments/${newEnv.hashedId}`);
    }

    return (
        <>
            <div className="create-new-environment-section">
                <p className="create-new-environment-title">Create New Environment</p>
                <button className="create-new-environment-button" onClick={() => setShowModal(true)}>+</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="create-new-environment-form-container">
                        <p className="create-new-environment-form-header">Create New Environment</p>
                        <form className="create-new-environment-form" onSubmit={createEnvironment}>
                            <label htmlFor="new-environment-title">{"Title: "}</label>
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
