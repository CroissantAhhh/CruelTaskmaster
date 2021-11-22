import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import EnvironmentCard from '../../components/EnvironmentCard';
import CreateEnvironmentModal from "../../components/CreateEnvironmentModal";

export default function HomePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userEnvironments = useSelector(state => Object.values(state.environments))

    useEffect(() => {
        if (userEnvironments) {
            setIsLoaded(true);
        }
    }, [userEnvironments])

    return (
        <div className="home-page-container">
            {isLoaded && (
                <div className="home-page-content">
                    <p>Home Page</p>
                    {userEnvironments.map((env) => {
                        return <EnvironmentCard key={env.hashedId} environment={env} />
                    })}
                    <CreateEnvironmentModal />
                </div>
            )}

        </div>

    )
}
