import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { loadJobSections } from '../../store/sections';
import { removeJobFromEnv } from '../../store/environments';
import { loadSingleJob, removeJob } from '../../store/jobs';
import JobPageProvider from '../../context/JobPageContext';
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
                        <Link to={`/environments/${parentEnv?.hashedId}`}>{`Back to "${parentEnv?.title}"`}</Link>
                        <p>{currentJob.title}</p>
                        <p>{currentJob.description}</p>
                        <EditJobModal job={currentJob} />
                        <DeleteConfirmationModal deleteRequest={deleteJob} resource={currentJob} resourceName={currentJob.title} />
                        {sectionsLoaded && (
                            <div className="job-board-page-content">
                                <JobBoard sections={jobSections} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </JobPageProvider>
    )
}
