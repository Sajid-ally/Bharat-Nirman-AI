import { useState, useEffect } from "react";

import {
    createUserWithEmailAndPassword
} from "firebase/auth";

import {
    auth
} from "../services/firebase";

import {
    useNavigate,
    Link
} from "react-router-dom";

import "../styles/login.css";

export default function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        const user =
            localStorage.getItem("user") ||
            sessionStorage.getItem("user");

        if (user) {
            navigate("/dashboard");
        }

    }, [navigate]);

    const signup = async () => {

        if (!email || !password) {

            alert("Please fill all fields");
            return;
        }

        if (password.length < 6) {

            alert(
                "Password must be at least 6 characters"
            );

            return;
        }

        try {

            setLoading(true);

            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            if (remember) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        result.user
                    )
                );

            } else {

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(
                        result.user
                    )
                );
            }

            setSuccess(true);

            setTimeout(() => {

                navigate("/dashboard");

            }, 1500);

        }

        catch (err) {

            if (
                err.code ===
                "auth/email-already-in-use"
            ) {

                alert(
                    "Account already exists. Redirecting to login."
                );

                setTimeout(() => {

                    navigate("/login");

                }, 1000);

            }

            else {

                alert(err.message);

            }
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

                {/* LEFT PANEL */}

                <div className="about-panel">

                    <h1>
                        CivicSetu AI
                    </h1>

                    <h3>
                        AI Powered Hyperlocal Governance Platform
                    </h3>

                    <div className="orange-line"></div>

                    <p>

                        CivicSetu AI enables citizens
                        to report, verify and track
                        local civic issues using
                        Artificial Intelligence.

                    </p>

                    <ul>

                        <li>
                            ✓ AI Issue Detection
                        </li>

                        <li>
                            ✓ Community Verification
                        </li>

                        <li>
                            ✓ Smart Analytics
                        </li>

                        <li>
                            ✓ Geo Tracking
                        </li>

                    </ul>

                    <div className="stats">

                        <div className="stat-card">

                            <h2>12K+</h2>

                            <p>
                                Citizens
                            </p>

                        </div>

                        <div className="stat-card">

                            <h2>8K+</h2>

                            <p>
                                Resolved
                            </p>

                        </div>

                        <div className="stat-card">

                            <h2>95%</h2>

                            <p>
                                Success
                            </p>

                        </div>

                    </div>

                </div>

                {/* SIGNUP CARD */}

                <div className="login-card">

                    <h2>

                        Citizen Registration

                    </h2>

                    {
                        success &&

                        <div className="success-box">

                            Account Created Successfully

                        </div>
                    }

                    <input
                        type="email"
                        placeholder="Enter Email"
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
                        placeholder="Create Password"
                        value={password}
                        onChange={
                            e =>
                                setPassword(
                                    e.target.value
                                )
                        }
                    />

                    <label
                        className="remember"
                    >

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
                        onClick={signup}
                        disabled={loading}
                    >

                        {
                            loading
                                ?
                                <>
                                    <span
                                        className="spinner"
                                    ></span>

                                    Creating Account...
                                </>
                                :
                                "Create Account"
                        }

                    </button>

                    <Link
                        to="/login"
                    >

                        Already have an account?

                    </Link>

                </div>

            </div>

        </div>
    );
}