import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { loadEnvironmentJobs } from '../../store/jobs';
import JobBoardCard from '../../components/JobBoardCard';
import CreateJobModal from '../../components/CreateJobModal';
import "./EnvironmentPage.css";

export default function EnvironmentPage() {
    const dispatch = useDispatch();
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

    // {
    //     title: 'Sample Job Title',
    //     banner: 'https://res.cloudinary.com/dmtj0amo0/image/upload/v1638048781/banners/banner11_oqou0s.jpg',
    //     description: ' Sample Job Description',
    //     sections: [
    //         { id: 2341234, title: "To-do", taskCount: 10 },
    //         { id: 5234523, title: "In Progress", taskCount: 2 },
    //         { id: 5345234, title: "Complete", taskCount: 7 }
    //     ]
    // }

    return (
        <div className="environment-page-container">
            {isLoaded && (
                <div className="environment-page-content">
                    <div className="env-welcome-banner">
                        <img src={currentEnvironment.banner} alt="env banner" height="500px" width="100%"></img>
                        <div className="transparent-filter"></div>
                        <div className="env-welcome-text">
                            <p className="env-title">{currentEnvironment.title}</p>
                            <p className="env-desc">{currentEnvironment.description}</p>
                        </div>
                    </div>
                    <div className="jobs-log-container">
                        <p className="jobs-log-header">Job Log</p>
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
                                        <img src={selectedJob?.banner} alt="job banner" height="300px" width="100%"></img>
                                        <div className="transparent-filter"></div>
                                        <p className="job-details-info-title">{selectedJob?.title}</p>
                                        <p className="job-details-info-desc">{selectedJob?.description}</p>
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
