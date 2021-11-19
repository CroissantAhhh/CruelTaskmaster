import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { loadJobTasks } from '../../store/tasks';
import { loadSingleJob } from '../../store/jobs';
import JobBoard from '../../components/JobBoard';

export default function JobBoardPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const { jobHash } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find((job) => job.hashedId === jobHash);
    const jobTasks = useSelector(state => Object.values(state.tasks));

    useEffect(() => {
        (async () => {
            await dispatch(loadSingleJob(jobHash))
        })();
    }, [jobHash, dispatch])

    useEffect(() => {
        (async () => {
            if (currentJob) {
                await dispatch(loadJobTasks(currentJob?.id))
                setTasksLoaded(true);
            }
        })();
    }, [currentJob, dispatch])

    return (
        <div className="job-board-page-container">
            {tasksLoaded && (
                <div className="job-board-page-content">
                    <p>{currentJob.title}</p>
                    <p>{currentJob.description}</p>
                    <JobBoard tasks={jobTasks} />
                </div>
            )}
        </div>
    )
}
