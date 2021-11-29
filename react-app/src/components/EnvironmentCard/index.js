import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import getBanner from '../../utils/getBanner';
import { updateEnvironment, removeEnvironment } from '../../store/environments';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import "./EnvironmentCard.css";

export default function EnvironmentCard({ environment }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [envTitle, setEnvTitle] = useState(environment?.title);
    const [envEDStyle, setEnvEDStyle] = useState({
        display: "none",
        width: "300px",
        position: "fixed",
        zIndex: 2,
        padding: "20px",
        borderRadius: "5px",
        border: "5px solid #3B2516",
        backgroundColor: "#A56D37",
    });

    function showEnvED(e) {
        e.stopPropagation();
        if (e.currentTarget.className === 'show-env-ED') {
            const envRect = e.currentTarget.getBoundingClientRect();
            setEnvEDStyle({
                ...envEDStyle,
                left: `${envRect.left}px`,
                top: `${envRect.top + 40}px`,
                display: 'inline-block',
            })
        } else {

        }
    }

    function closeEnvED(e) {
        e.stopPropagation();
        setEnvEDStyle({
            ...envEDStyle,
            top: "",
            left: "",
            display: "none",
        })
    }

    async function editEnvTitle(e) {
        e.preventDefault();

        if (envTitle) {
            await dispatch(updateEnvironment({
                id: environment?.id,
                title: envTitle,
            }));
        }
        await setEnvTitle(envTitle);
        closeEnvED(e);
        return;
    }

    function deleteEnv(e) {
        dispatch(removeEnvironment(environment?.id));
        closeEnvED(e);
        history.push("/home");
    }

    const editDeleteEnv = (
        <div className="edit-delete-env-container" style={envEDStyle}>
            <div className="EDE-top">
                <div className="edit-env-title-section">
                    <p className="edit-env-title">Edit Section Title</p>
                    <form className="edit-env-title-form" onSubmit={editEnvTitle}>
                        <input type="text" value={envTitle} onChange={e => setEnvTitle(e.target.value)}></input>
                        <button className="EETF-submit" type="submit">Save</button>
                    </form>
                </div>
                <div className="close-env-ED" onClick={e => closeEnvED(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="delete-env-section">
                <DeleteConfirmationModal deleteRequest={deleteEnv} resource={environment} resourceName={environment.title} />
            </div>
        </div>
    )

    return (
        <div className="environment-card-border">
            <div className="environment-card">
                <img src={environment.banner} alt="env card background" height="80%" width="100%"></img>
                <div className="env-card-bottom">
                    <Link className="environment-card-title" to={`/environments/${environment.hashedId}`}>{environment.title}</Link>
                    <button className="show-env-ED" onClick={showEnvED}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>
                </div>
                {editDeleteEnv}
            </div>
        </div>
    )
}
