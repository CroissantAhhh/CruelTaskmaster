
import SignUpForm from "../../components/auth/SignUpForm";
import "./SignupPage.css";

export default function SignupPage() {
    return (
        <div className="signup-page-container">
            <p className="signup-form-title">Enlist Now!</p>
            <div className="signup-form-border">
                <div className="signup-page-form">
                    <div className="signup-form-header">
                        <p>New Recruit Details</p>
                    </div>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}
