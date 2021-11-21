import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadJobSections } from '../../store/sections';
import { loadSingleJob } from '../../store/jobs';
import JobPageProvider from '../../context/JobPageContext';
import JobBoard from '../../components/JobBoard';
import './JobBoardPage.css';

export default function JobBoardPage() {
    const dispatch = useDispatch();
    const [sectionsLoaded, setSectionsLoaded] = useState(false);
    const { jobHash } = useParams();
    const userJobs = useSelector(state => Object.values(state.jobs));
    const currentJob = userJobs?.find((job) => job.hashedId === jobHash);
    const jobSections = useSelector(state => Object.values(state.sections));

    useEffect(() => {
        (async () => {
            await dispatch(loadSingleJob(jobHash))
            await dispatch(loadJobSections(jobHash))
            setSectionsLoaded(true)
        })();
    }, [jobHash, dispatch])

    return (
        <JobPageProvider>
            <div className="job-board-page-container-container">
                <div className="job-board-page-container">
                    <p>{currentJob?.title}</p>
                    <p>{currentJob?.description}</p>
                    {sectionsLoaded && (
                        <div className="job-board-page-content">
                            <JobBoard sections={jobSections} />
                        </div>
                    )}
                </div>
            </div>
        </JobPageProvider>
    )
}
