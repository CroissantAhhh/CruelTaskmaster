import LoginForm from "../../components/auth/LoginForm"
import "./LoginPage.css"


export default function LoginPage() {
    return (
        <div className="login-page-container">
            <p className="login-form-title">Welcome Back, Soldier!</p>
            <div className="login-form-border">
                <div className="login-page-form">
                    <div className="login-form-header">
                        <p>Check In Here:</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
