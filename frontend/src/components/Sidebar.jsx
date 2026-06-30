import { Link } from "react-router-dom";

import {
    FaHome,
    FaMap,
    FaChartBar,
    FaBell,
    FaCog,
    FaRobot,
    FaTasks
}
from "react-icons/fa";

import {
    MdReport,
    MdForum
}
from "react-icons/md";

import "../styles/sidebar.css";

export default function Sidebar({
    sidebar
}){

return(

<div
className={
sidebar
?
"sidebar"
:
"sidebar close"
}
>

    {/* TOP */}

    <div className="sidebar-top">

        <img
            src="/chakra.png"
            alt=""
        />

        {
            sidebar &&

            <>

                <h2>
                    BharatNirman AI
                </h2>

                <p>
                    Government of India
                </p>

            </>
        }

    </div>


    {/* MENU */}

    <div className="sidebar-menu">

        <Link
            to="/dashboard"
            className="item"
        >
            <FaHome/>
            <span>
                Dashboard
            </span>
        </Link>


        <Link
            to="/report"
            className="item"
        >
            <MdReport/>
            <span>
                Report Issue
            </span>
        </Link>


        <Link
            to="/feed"
            className="item"
        >
            <MdForum/>
            <span>
                Community
            </span>
        </Link>


        <Link
            to="/map"
            className="item"
        >
            <FaMap/>
            <span>
                Smart Map
            </span>
        </Link>


        <Link
            to="/analytics"
            className="item"
        >
            <FaChartBar/>
            <span>
                Analytics
            </span>
        </Link>


        <Link
            to="/tracker"
            className="item"
        >
            <FaTasks/>
            <span>
                Tracker
            </span>
        </Link>


        <Link
            to="/ai"
            className="item"
        >
            <FaRobot/>
            <span>
                AI Engine
            </span>
        </Link>

    </div>


    {/* FOOTER */}

    <div className="sidebar-footer">

        <div className="item">

            <FaBell/>

            <span>
                Alerts
            </span>

        </div>

        <div className="item">

            <FaCog/>

            <span>
                Settings
            </span>

        </div>

    </div>

</div>

);

}