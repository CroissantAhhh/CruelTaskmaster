
import { Link } from "react-router-dom";
import "./SplashPage.css"

export default function SplashPage() {
    return (
        <div className="splash-page-container">
            <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637873140/backtoworkfiltered_wcmbvm.jpg" alt="splash page background" width="100%"></img>
            <div className="splash-page-text-info">
                <p className="splash-page-slogan">BACK TO WORK!</p>
                <p className="splash-page-description">Manage your responsibilities and to-do's with the help of Cruel Taskmaster</p>
                <img src="https://res.cloudinary.com/dmtj0amo0/image/upload/v1637700432/cruelTaskmasterLogoWhite_h6nw0r.png" alt="white logo" height="60px"></img>
                <div className="login-signup">
                    <div className="signup-section auth">
                        <p className="signup-title">Join the Horde!</p>
                        <Link to="/signup">Signup</Link>
                    </div>
                    <div className="login-section auth">
                        <p className="login-title">Welcome Back</p>
                        <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
