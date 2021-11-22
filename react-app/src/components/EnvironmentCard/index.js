import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateEnvironment, removeEnvironment } from '../../store/environments';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import "./EnvironmentCard.css";

export default function EnvironmentCard({ environment }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [envTitle, setEnvTitle] = useState(environment?.title);
    const [envEDStyle, setEnvEDStyle] = useState({
        display: "none",
        position: "fixed",
        zIndex: 2,
        padding: "30px",
        borderRadius: "30px",
        border: "1px solid black",
        backgroundColor: "white",
    });

    function showEnvED(e) {
        e.stopPropagation();
        if (e.currentTarget.className === 'show-env-ED') {
            const envRect = e.currentTarget.getBoundingClientRect();
            setEnvEDStyle({
                ...envEDStyle,
                left: `${envRect.left}px`,
                top: `${envRect.top}px`,
                display: 'inline-block',
            })
        } else {

        }
    }

    function closeEnvED(e) {
        e.stopPropagation();
        setEnvTitle(environment.title);
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
            dispatch(updateEnvironment({
                id: environment?.id,
                title: envTitle,
            }));
        }
        closeEnvED(e);
        return;
    }

    function deleteEnv(e) {
        dispatch(removeEnvironment(environment?.id));
        closeEnvED(e);
        history.push("/home");
    }

    console.log(environment)

    const editDeleteEnv = (
        <div className="edit-delete-env-container" style={envEDStyle}>
            <button className="close-env-ED" onClick={e => closeEnvED(e)}>x</button>
            <p className="edit-env-title">Edit Section Title</p>
            <form className="edit-env-title-form" onSubmit={editEnvTitle}>
                <input type="text" value={envTitle} onChange={e => setEnvTitle(e.target.value)}></input>
            </form>
            <DeleteConfirmationModal deleteRequest={deleteEnv} resource={environment} resourceName={environment.title} />
        </div>
    )

    return (
        <div className="environment-card">
            <Link className="environment-card-title" to={`/environments/${environment.hashedId}`}>{environment.title}</Link>
            <button className="show-env-ED" onClick={showEnvED}>...</button>
            {editDeleteEnv}
        </div>
    )
}
