import { useEffect,useState } from "react";

import {
collection,
onSnapshot,
orderBy,
query
}
from "firebase/firestore";

import {
db
}
from "../services/firebase";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CommunityFeed(){

const [sidebar,setSidebar]=
useState(true);

const [reports,setReports]=
useState([]);

useEffect(()=>{

const q=
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

const unsub=
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

return()=>unsub();

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

<div className="dashboard-main">

<div className="panel">

<h2>
Community Feed
</h2>

{

reports.map(report=>

<div
className="report"
key={report.id}
>

<h3>
{report.title}
</h3>

<p>
{report.description}
</p>

<p>
📍 {report.address}
</p>

<p>
🏛 {report.department}
</p>

<p>
⚠ {report.severity}
</p>

<p>
🆔 {report.complaintId}
</p>

<p>
📌 {report.status}
</p>

</div>

)

}

</div>

</div>

</div>

</>

);

}