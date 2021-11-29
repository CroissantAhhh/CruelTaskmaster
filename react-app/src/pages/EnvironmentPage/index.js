import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { loadEnvironmentJobs } from '../../store/jobs';
import JobBoardCard from '../../components/JobBoardCard';
import CreateJobModal from '../../components/CreateJobModal';
import "./EnvironmentPage.css";

export default function EnvironmentPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const { environmentHash } = useParams();
    const userEnvironments = useSelector(state => Object.values(state.environments));
    const currentEnvironment = userEnvironments?.find(env => env.hashedId === environmentHash);

    useEffect(() => {
        (async () => {
            if (currentEnvironment?.id) {
                await dispatch(loadEnvironmentJobs(currentEnvironment?.id));
                setIsLoaded(true);
            }
        })();
    }, [currentEnvironment?.id, dispatch])

    const envJobs = useSelector(state => Object.values(state.jobs));
    const [selectedJob, setSelectedJob] = useState();

    function goToJob() {
        history.push(`/jobs/${selectedJob.hashedId}`)
    }

    return (
        <div className="environment-page-container">
            {isLoaded && (
                <div className="environment-page-content">
                    <div className="env-welcome-banner">
                        <img src={currentEnvironment.banner} alt="env banner" height="400px" width="100%"></img>
                        <div className="transparent-filter"></div>
                        <div className="env-welcome-text">
                            <p className="env-title">{currentEnvironment.title}</p>
                            <p className="env-desc">{currentEnvironment.description}</p>
                        </div>
                    </div>
                    <div className="jobs-log-container">
                        <div className="job-log-header-container">
                            <Link to={'/home'}>
                                <div className="link-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                                    </svg>
                                    <p>&nbsp;&nbsp;{`Back to Environments`}</p>
                                </div>
                            </Link>
                            <p className="jobs-log-header">Job Log</p>
                            <div className="JLH-placeholder"></div>
                        </div>
                        <div className="jobs-log">
                            <div className="job-log-cards-section">
                                <p className="job-log-cards-header">Jobs</p>
                                {envJobs?.map((job) => (
                                    <div className="job-log-card" key={job.id} onClick={() => setSelectedJob(job)} style={{ backgroundColor: `${job === selectedJob ? '#85261c' : '#633B1D'}`}}>
                                        <p className="job-card-title">{job.title}</p>
                                    </div>
                                ))}
                                <CreateJobModal envId={currentEnvironment?.id} />
                            </div>
                            <div className="job-details">
                                <p className="job-details-header">Job Details</p>
                                {selectedJob && (
                                    <div className="job-details-info">
                                        <div className="job-details-top">
                                            <img src={selectedJob?.banner} alt="job banner" height="300px" width="100%"></img>
                                            <div className="transparent-filter"></div>
                                            <p className="job-details-info-title">{selectedJob?.title}</p>
                                            <p className="job-details-info-desc">{selectedJob?.description}</p>
                                        </div>
                                        <div className="job-details-bottom">
                                            <ul className="tasks-breakdown">
                                                <p className="tasks-breakdown-header">Tasks Status</p>
                                                {selectedJob.tasksStatus.map((task) => (
                                                    <li key={task.id} className="section-breakdown">
                                                        <p>{`${task.title}: ${task.taskCount}`}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="job-board-portal" onClick={goToJob}>
                                                <p>Go to Job Board</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="50px" width="50px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
