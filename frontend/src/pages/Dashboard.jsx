import { useState,useEffect } from "react";

import {
collection,
onSnapshot
} from "firebase/firestore";

import {
db
} from "../services/firebase";

import {
deleteReport
} from "../services/deleteReport";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard.css";

export default function Dashboard(){

const [sidebar,setSidebar]=
useState(true);

const [reports,setReports]=
useState([]);

const [stats,setStats]=
useState({

total:0,
resolved:0,
pending:0,
hero:0,
verified:0

});

useEffect(()=>{

const unsub=
onSnapshot(

collection(
db,
"reports"
),

snapshot=>{

const data=
snapshot.docs.map(
doc=>({

id:doc.id,
...doc.data()

})
);

setReports(data);

setStats({

total:
data.length,

resolved:
data.filter(
x=>
x.status==="Resolved"
).length,

pending:
data.filter(
x=>
x.status!=="Resolved"
).length,

hero:
data.length*20,

verified:
Math.floor(
data.length*0.85
)

});

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

{/* HERO */}

<div className="hero">

<div>

<h1>
BharatNirman AI
</h1>

<p>
AI Powered Hyperlocal Governance Platform
</p>

</div>

<div className="hero-users">

<h2>
{stats.total}
</h2>

<p>
Active Complaints
</p>

</div>

</div>

{/* STATS */}

<div className="stats">

<div className="stat">
<div style={{fontSize:"40px"}}>
📄
</div>
<h4>Total Reports</h4>
<h2>{stats.total}</h2>
<p>Live Data</p>
</div>

<div className="stat">
<div style={{fontSize:"40px"}}>
✅
</div>
<h4>Resolved</h4>
<h2>{stats.resolved}</h2>
<p>Completed</p>
</div>

<div className="stat">
<div style={{fontSize:"40px"}}>
⏳
</div>
<h4>Pending</h4>
<h2>{stats.pending}</h2>
<p>In Progress</p>
</div>

<div className="stat">
<div style={{fontSize:"40px"}}>
⭐
</div>
<h4>Hero Points</h4>
<h2>{stats.hero}</h2>
<p>Community</p>
</div>

<div className="stat">
<div style={{fontSize:"40px"}}>
🛡️
</div>
<h4>Verified</h4>
<h2>{stats.verified}</h2>
<p>AI Verified</p>
</div>

</div>

{/* GRID */}

<div className="grid">

{/* AI INSIGHTS */}

<div className="panel">

<h2>
AI Insights
</h2>

<div className="alert high">
🔥 High complaint density detected
</div>

<div className="alert medium">
🗑️ Garbage complaints increasing
</div>

<div className="alert low">
💧 Water leakage cluster found
</div>

<div className="alert medium">
🌫️ AQI moderate today
</div>

<div className="alert low">
🧹 Community cleanliness drive recommended
</div>

</div>

{/* REPORTS */}

<div className="panel">

<h2>
Recent Reports
</h2>

{
reports.length===0

?

<div className="report">
No reports found
</div>

:

reports
.slice(0,10)
.map(report=>

<div
className="report"
key={report.id}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<h4>
{report.title}
</h4>

<p>
📍 {report.address}
</p>

<p>
🆔 {report.complaintId}
</p>

<p>
🏢 {report.department}
</p>

<p>
⚠️ {report.priority}
</p>

</div>

<button

onClick={async()=>{

if(
window.confirm(
"Delete complaint?"
)
){

await deleteReport(
report.id
);

}

}}

style={{

background:"#d32f2f",
color:"white",
border:"none",
padding:"10px",
borderRadius:"8px",
cursor:"pointer"

}}

>

🗑️

</button>

</div>

</div>

)
}

</div>

</div>

{/* BOTTOM */}

<div
className="grid"
style={{
marginTop:"25px"
}}
>

<div className="panel">

<h2>
Community Activity
</h2>

<div className="report">
👤 Rahul verified road complaint
</div>

<div className="report">
🧹 Priya cleaned local park
</div>

<div className="report">
🗑️ Garbage issue resolved
</div>

<div className="report">
🛣️ Road repair started
</div>

<div className="report">
🤝 15 citizens joined cleanliness drive
</div>

</div>

<div className="panel">

<h2>
Top Contributors
</h2>

<div className="report">
🥇 Rahul Sharma — 1250 pts
</div>

<div className="report">
🥈 Priya Singh — 980 pts
</div>

<div className="report">
🥉 Amit Verma — 750 pts
</div>

<div className="report">
⭐ You — {stats.hero} pts
</div>

<div className="report">
🏆 BharatNirman Heroes
</div>

</div>

</div>

</div>

</div>

</>

);

}