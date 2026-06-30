import {
    useEffect,
    useState
}
from "react";

import {
    collection,
    onSnapshot
}
from "firebase/firestore";

import {
    db
}
from "../services/firebase";

import {
    getTracker
}
from "../services/tracker";

import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

export default function Tracker(){

    const [
        sidebar,
        setSidebar
    ] = useState(true);

    const [
        trackers,
        setTrackers
    ] = useState([]);

    useEffect(()=>{

        const unsub =
        onSnapshot(

            collection(
                db,
                "reports"
            ),

            async snapshot=>{

                const reports =
                snapshot.docs.map(
                    doc=>({

                        id:doc.id,

                        ...doc.data()

                    })
                );

                const result=[];

                for(
                    const report
                    of reports
                ){

                    const t =
                    await getTracker(
                        report
                    );

                    result.push(t);
                }

                setTrackers(
                    result
                );
            }
        );

        return ()=>unsub();

    },[]);

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

            <div
                style={{
                    flex:1,
                    padding:"20px"
                }}
            >

                <h1>
                    Complaint Tracker
                </h1>

                {

                    trackers.map(
                        (t,i)=>

                        <div
                            className="panel"
                            key={i}
                            style={{
                                marginBottom:"20px"
                            }}
                        >

                            <h3>
                                {
                                    t.complaintId
                                }
                            </h3>

                            <p>
                                Status:
                                {
                                    t.status
                                }
                            </p>

                            <p>
                                Department:
                                {
                                    t.department
                                }
                            </p>

                            <p>
                                Officer:
                                {
                                    t.officer
                                }
                            </p>

                            <p>
                                Created:
                                {
                                    t.created
                                }
                            </p>

                            <p>
                                Expected:
                                {
                                    t.expected
                                }
                            </p>

                            <progress
                                value={
                                    t.progress
                                }
                                max="100"
                                style={{
                                    width:"100%"
                                }}
                            />

                            <br/>
                            <br/>

                            {

                                t.timeline.map(
                                    (s,j)=>

                                    <div
                                        key={j}
                                    >

                                        {
                                            s.done
                                            ?
                                            "✓ "
                                            :
                                            "○ "
                                        }

                                        {
                                            s.step
                                        }

                                    </div>
                                )

                            }

                        </div>
                    )

                }

            </div>

        </div>

        </>
    );
}