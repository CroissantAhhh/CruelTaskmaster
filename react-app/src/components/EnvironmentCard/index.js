import { useHistory } from 'react-router-dom';
import "./EnvironmentCard.css";

export default function EnvironmentCard({ environment }) {
    const history = useHistory();

    function redirect() {
        history.push(`/environments/${environment.hashedId}`);
    }

    return (
        <div className="environment-card" onClick={() => redirect()}>
            <p className="environment-card-title">{environment.title}</p>
        </div>
    )
}
