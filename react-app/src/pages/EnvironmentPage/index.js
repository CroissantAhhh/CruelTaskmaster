import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { loadEnvironmentJobs } from '../../store/jobs';

export default function EnvironmentPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const { environmentHash } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const userEnvironments = useSelector(state => Object.values(state.environments));
    const currentEnvironment = userEnvironments?.find(env => env.hashedId === environmentHash);

    useEffect(() => {
        if (currentEnvironment) {
            dispatch(loadEnvironmentJobs(currentEnvironment?.id)).then(() => setIsLoaded(true));
        }
    }, [currentEnvironment, dispatch])

    return (
        <div className="environment-page-container">
            {isLoaded && (
                <div className="environment-page-content">
                    <p>{currentEnvironment.title}</p>
                    <p>{currentEnvironment.description}</p>
                    {currentEnvironment.jobLinks.map((job) => {
                        return <Link to={`/jobs/${job.link}`} key={job.link}>{job.title}</Link>
                    })}
                </div>
            )}
        </div>

    )
}
