import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { loadJobSections } from '../../store/sections';
import { removeJobFromEnv } from '../../store/environments';
import { loadSingleJob, removeJob } from '../../store/jobs';
import JobPageProvider from '../../context/JobPageContext';
import AddSectionModal from '../../components/JobBoard/AddSectionModal';
import EditJobModal from '../../components/EditJobModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import JobBoard from '../../components/JobBoard';
import './JobBoardPage.css';

export default function JobBoardPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [jobLoaded, setJobLoaded] = useState(false);
    const [sectionsLoaded, setSectionsLoaded] = useState(false);
    const { jobHash } = useParams();
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find((job) => job.hashedId === jobHash);
    const jobSections = useSelector(state => Object.values(state.sections));
    const parentEnv = useSelector(state => state.environments[currentJob?.environmentId]);

    useEffect(() => {
        (async () => {
            await dispatch(loadSingleJob(jobHash));
            setJobLoaded(true);
            await dispatch(loadJobSections(jobHash));
            setSectionsLoaded(true);
        })();
    }, [jobHash, dispatch])

    function deleteJob(e, job) {
        dispatch(removeJob(job.id));
        dispatch(removeJobFromEnv(parentEnv?.id, jobHash));
        history.push(`/environments/${parentEnv?.hashedId}`);
    }

    return (
        <JobPageProvider>
            <div className="job-board-page-container-container">
                {jobLoaded && (
                    <div className="job-board-page-container">
                        <div className="job-board-header">
                            <div className="JBH-blocker"></div>
                            <div className="JBH-left">
                                <Link to={`/environments/${parentEnv?.hashedId}`}>
                                    <p className="link-content">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                                        </svg>
                                        <p>&nbsp;&nbsp;{`Back to "${parentEnv?.title}"`}</p>
                                    </p>
                                </Link>
                            </div>
                            <div className="JBH-middle">
                                <p className="JBH-title">{currentJob.title}</p>
                                <p className="JBH-desc">{currentJob.description}</p>
                            </div>
                            <div className="JBH-right">
                                <AddSectionModal />
                                <EditJobModal job={currentJob} />
                                <DeleteConfirmationModal deleteRequest={deleteJob} resource={currentJob} resourceName={currentJob.title} />
                            </div>
                        </div>
                        {sectionsLoaded && (
                            <div className="job-board-page-content">
                                <JobBoard sections={jobSections} />
                            </div>
                        )}
                        <div className="job-board-closing-bar"></div>
                    </div>
                )}
            </div>
        </JobPageProvider>
    )
}
