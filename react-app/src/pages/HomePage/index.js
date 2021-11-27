import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import "./HomePage.css";
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
                    <div className="welcome-banner">
                        <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637974480/banners/orcbuildingbanner_fl5j0b.jpg" alt="orc building" width="100%"></img>
                        <div className="transparent-filter"></div>
                        <p className="welcome-banner-message">No more slacking around, grunt! Get back to work!</p>
                    </div>
                    <div className="environments-board">
                        <p className="environments-title">Environments</p>
                        <div className="environment-cards">
                            {userEnvironments.map((env) => {
                                return <EnvironmentCard key={env.hashedId} environment={env} />
                            })}
                            <CreateEnvironmentModal />
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}
