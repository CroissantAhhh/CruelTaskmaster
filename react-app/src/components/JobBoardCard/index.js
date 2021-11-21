import { useHistory } from 'react-router-dom';
import "./JobBoardCard.css";

export default function JobBoardCard({ job }) {
    const history = useHistory();

    function redirect(jobHash) {
        history.push(`/jobs/${jobHash}`);
    }
    return (
        <div className="job-board-card" onClick={() => redirect(job.link)}>
            <p className="job-board-card-title">{job.title}</p>
        </div>
    )
}
