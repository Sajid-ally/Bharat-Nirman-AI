import { useEffect,useState } from "react";

import {
collection,
onSnapshot,
orderBy,
query
}
from "firebase/firestore";

import { db }
from "../services/firebase";

export default function RecentComplaints(){

    const [reports,
    setReports] =
    useState([]);

    useEffect(()=>{

        const q =
        query(

            collection(
                db,
                "reports"
            ),

            orderBy(
                "created",
                "desc"
            )

        );

        const unsub =
        onSnapshot(

            q,

            snapshot=>{

                setReports(

                    snapshot.docs.map(
                        doc=>({

                            id:doc.id,
                            ...doc.data()

                        })
                    )

                );

            }

        );

        return ()=>unsub();

    },[]);

    return(

        <div className="panel">

            <h2>
                Recent Complaints
            </h2>

            {

                reports
                .slice(0,5)
                .map(report=>

                    <div
                        className="report"
                        key={report.id}
                    >

                        <h4>
                            {report.title}
                        </h4>

                        <p>
                            {report.address}
                        </p>

                        <p>
                            ID:
                            {report.complaintId}
                        </p>

                        <p>
                            {report.department}
                        </p>

                    </div>

                )

            }

        </div>

    );

}