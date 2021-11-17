import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loadJobTasks } from '../../store/tasks';
import { loadSingleJob } from '../../store/jobs';
import JobBoard from '../../components/JobBoard';

export default function JobBoardPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { jobHash } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find((job) => job.hashedId === jobHash);
    const jobTasks = useSelector(state => Object.values(state.tasks));

    useEffect(() => {
        dispatch(loadSingleJob(jobHash))
    }, [jobHash, dispatch])

    useEffect(() => {
        if (currentJob) {
            dispatch(loadJobTasks(currentJob?.id)).then(() => setIsLoaded(true))
        }
    }, [currentJob, dispatch])

    useEffect(() => {
        if (!sessionUser) {
            history.push('/');
        }
    }, [history, sessionUser])

    return (
        <div className="job-board-page-container">
            {isLoaded && (
                <div className="job-board-page-content">
                    <p>{currentJob.title}</p>
                    <p>{currentJob.description}</p>
                    <JobBoard tasks={jobTasks} />
                </div>
            )}
        </div>

    )
}
