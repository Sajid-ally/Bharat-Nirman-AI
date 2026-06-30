import { FaBars } from "react-icons/fa";

import "../styles/navbar.css";

export default function Navbar({

    sidebar,
    setSidebar

}) {

    return (

        <div className="navbar">

            <div className="nav-left">

                <button
                    className="menu-btn"
                    onClick={() =>
                        setSidebar(!sidebar)
                    }
                >
                    <FaBars />
                </button>

                <img
                    src="/emblem.png"
                    className="emblem"
                    alt=""
                />

                <div className="brand">

                    <h2>
                        BharatNirman AI
                    </h2>

                    <p>
                        Government of India
                    </p>

                </div>

            </div>

            <div className="nav-right">

                <button
                    className="logout-btn"
                    onClick={() => {

                        localStorage.clear();
                        sessionStorage.clear();

                        window.location =
                            "/login";

                    }}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}