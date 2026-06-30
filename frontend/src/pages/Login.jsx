import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";

import {
    auth,
    googleProvider
} from "../services/firebase";

import "../styles/login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const login = async () => {

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            if (remember) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );

            } else {

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(result.user)
                );
            }

            setSuccess(true);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        }
        catch (err) {

            alert(err.message);

        }
        finally {

            setLoading(false);
        }
    };

    const googleLogin = async () => {

        try {

            setLoading(true);

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            setSuccess(true);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        }
        catch (err) {

            alert(err.message);

        }
        finally {

            setLoading(false);
        }
    };

    return (

        <div className="page">

            <div className="gov-header">
                GOVERNMENT OF INDIA
            </div>

            <div className="main-container">

                <div className="about-panel">

                    <h1>
                        CivicSetu AI
                    </h1>

                    <h3>
                        AI Powered Hyperlocal Governance Platform
                    </h3>

                    <div className="orange-line"></div>

                    <p>
                        CivicSetu AI empowers citizens
                        to identify, report, validate,
                        and track civic issues using AI.
                    </p>

                    <ul>
                        <li>✓ AI Issue Categorization</li>
                        <li>✓ Community Verification</li>
                        <li>✓ Geo Tracking</li>
                        <li>✓ Smart Analytics</li>
                    </ul>

                    <div className="stats">

                        <div className="stat-card">
                            <h2>12K+</h2>
                            <p>Citizens</p>
                        </div>

                        <div className="stat-card">
                            <h2>8K+</h2>
                            <p>Resolved</p>
                        </div>

                        <div className="stat-card">
                            <h2>1.2K+</h2>
                            <p>Volunteers</p>
                        </div>

                    </div>

                </div>

                <div className="login-card">

                    <h2>
                        Citizen Login
                    </h2>

                    {
                        success &&
                        <div className="success-box">
                            Login Successful
                        </div>
                    }

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={
                            e =>
                                setEmail(
                                    e.target.value
                                )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={
                            e =>
                                setPassword(
                                    e.target.value
                                )
                        }
                    />

                    <label className="remember">

                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={
                                e =>
                                    setRemember(
                                        e.target.checked
                                    )
                            }
                        />

                        Keep me signed in

                    </label>

                    <button
                        className="login-btn"
                        onClick={login}
                        disabled={loading}
                    >

                        {
                            loading
                                ?
                                <>
                                    <span className="spinner"></span>
                                    Processing...
                                </>
                                :
                                "Continue"
                        }

                    </button>

                    <button
                        className="google-btn"
                        onClick={googleLogin}
                    >
                        Continue With Google
                    </button>

                    <Link to="/signup">
                        Create Account
                    </Link>

                </div>

            </div>

        </div>
    );
}