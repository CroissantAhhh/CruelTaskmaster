import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loadJobSections } from '../../store/sections';
import { loadSectionTasks } from '../../store/tasks';
import { loadSingleJob } from '../../store/jobs';
import JobPageProvider from '../../context/JobPageContext';
import JobBoard from '../../components/JobBoard';

export default function JobBoardPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [sectionsLoaded, setSectionsLoaded] = useState(false);
    const { jobHash } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find((job) => job.hashedId === jobHash);
    const jobSections = useSelector(state => Object.values(state.sections));

    useEffect(() => {
        (async () => {
            await dispatch(loadSingleJob(jobHash))
            await dispatch(loadJobSections(currentJob?.id))
            setSectionsLoaded(true)
        })();
    }, [jobHash, dispatch])

    return (
        <JobPageProvider>
            <div className="job-board-page-container">
                {sectionsLoaded && (
                    <div className="job-board-page-content">
                        <p>{currentJob.title}</p>
                        <p>{currentJob.description}</p>
                        <JobBoard sections={jobSections} />
                    </div>
                )}
            </div>
        </JobPageProvider>
    )
}
