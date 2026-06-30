import {
getCoordinates
}
from "../services/location"; 
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { analyzeIssue }
from "../services/gemini";

import {
collection,
addDoc
}
from "firebase/firestore";

import {
db
}
from "../services/firebase";

import "../styles/report.css";

export default function ReportIssue(){

    const navigate =
    useNavigate();

    const [sidebar,setSidebar] =
    useState(true);

    const [title,setTitle] =
    useState("");

    const [description,setDescription] =
    useState("");

    const [address,setAddress] =
    useState("");

    const [location,setLocation] =
    useState(null);

    const [image,setImage] =
    useState(null);

    const [preview,setPreview] =
    useState(null);

    const [loading,setLoading] =
    useState(false);

    const [submitted,setSubmitted] =
    useState(false);

    const [complaintId,
    setComplaintId] =
    useState("");

    const [ai,setAi] =
    useState(null);


    // AUTO LOCATION

    useEffect(()=>{

        navigator.geolocation
        .getCurrentPosition(

            async(position)=>{

                const lat =
                position.coords.latitude;

                const lng =
                position.coords.longitude;

                setLocation({
                    lat,
                    lng
                });

                try{

                    const res =
                    await fetch(

`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

                    );

                    const data =
                    await res.json();

                    if(
                        data.display_name
                    ){

                        setAddress(
                            data.display_name
                        );

                    }

                }
                catch(err){

                    console.log(err);

                }

            },

            ()=>{

                console.log(
                    "GPS denied"
                );

            }

        );

    },[]);



    // SUBMIT

    const submitReport =
async()=>{

    if(
        !title ||
        !description
    ){

        alert(
            "Please fill all fields"
        );

        return;
    }

    try{

        setLoading(true);

        // AI ANALYSIS
        const result =
        await analyzeIssue(
            title,
            description
        );

        setAi(result);

        // COMPLAINT ID
        const id =
        "BNA-" +
        Date.now();

        setComplaintId(id);

        // ADDRESS -> LAT LNG
        let coords =
        await getCoordinates(
            address
        );

        // fallback GPS
        if(!coords){

            coords={

                latitude:
                location?.lat,

                longitude:
                location?.lng

            };

        }

        console.log(
            "COORDS:",
            coords
        );

        await addDoc(

            collection(
                db,
                "reports"
            ),

            {

                complaintId:id,

                title,

                description,

                address,

                latitude:
                coords?.latitude,

                longitude:
                coords?.longitude,

                category:
                result.category,

                severity:
                result.severity,

                department:
                result.department,

                priority:
                result.priority,

                status:
                "Pending",

                created:
                new Date()

            }

        );

        setSubmitted(
            true
        );

        setTimeout(()=>{

            navigate(
                "/dashboard"
            );

        },2000);

    }

    catch(err){

        console.log(err);

        alert(
            "Submission Failed"
        );

    }

    finally{

        setLoading(false);

    }

};


    return(

        <>

        <Navbar
            sidebar={sidebar}
            setSidebar={setSidebar}
        />

        <div className="dashboard">

            <Sidebar
                sidebar={sidebar}
            />

            <div className="report-page">

                <div className="report-card">

                    <h1>
                        Report Civic Issue
                    </h1>

                    <input
                        placeholder=
                        "Issue Title"

                        value={title}

                        onChange={
                            e=>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        placeholder=
                        "Describe the issue"

                        value={description}

                        onChange={
                            e=>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <input
                        placeholder=
                        "Issue Address"

                        value={address}

                        onChange={
                            e=>
                            setAddress(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="file"

                        accept="image/*"

                        onChange={

                            e=>{

                                setImage(
                                    e.target.files[0]
                                );

                                setPreview(

                                    URL.createObjectURL(
                                        e.target.files[0]
                                    )

                                );

                            }

                        }
                    />

                    {

                        preview &&

                        <img
                            src={preview}
                            alt=""
                            className="preview"
                        />

                    }

                    {

                        location &&

                        <div
                        className=
                        "location-box"
                        >

                            <b>
                            GPS Detected
                            </b>

                            <br/>

                            Latitude:
                            {location.lat}

                            <br/>

                            Longitude:
                            {location.lng}

                        </div>

                    }

                    <button
                        className=
                        "submit-btn"

                        onClick={
                            submitReport
                        }

                        disabled={
                            loading
                        }
                    >

                        {

                            loading
                            ?
                            "Analyzing with AI..."
                            :
                            "Submit Report"

                        }

                    </button>

                    {

                        ai &&

                        <div
                        className=
                        "ai-box"
                        >

                            <h3>
                                AI Analysis
                            </h3>

                            <p>
                                <b>
                                Category:
                                </b>

                                {" "}

                                {ai.category}
                            </p>

                            <p>
                                <b>
                                Severity:
                                </b>

                                {" "}

                                {ai.severity}
                            </p>

                            <p>
                                <b>
                                Department:
                                </b>

                                {" "}

                                {ai.department}
                            </p>

                            <p>
                                <b>
                                Priority:
                                </b>

                                {" "}

                                {ai.priority}
                            </p>

                        </div>

                    }

                    {

                        submitted &&

                        <div
                        className=
                        "success-box"
                        >

                            <h3>
                                Report Submitted Successfully
                            </h3>

                            <p>

                                Complaint ID:

                                <b>
                                    {complaintId}
                                </b>

                            </p>

                            <p>
                                Redirecting to Dashboard...
                            </p>

                        </div>

                    }

                </div>

            </div>

        </div>

        </>

    );

}