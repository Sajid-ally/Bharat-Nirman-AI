import {
    getAIRisk,
    getAIExplanation,
    getAIAlert
}
from "../services/ai";
import {
getRecommendation
}
from
"../services/recommendation";
import {
    getRisk
}
from
"../services/risk";
import {
useState,
useEffect
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
analyzeHotspots
}
from "../services/api";

import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import {

MapContainer,
TileLayer,
Marker,
Popup,
Circle

}
from "react-leaflet";

import MarkerClusterGroup
from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";

export default function MapPage(){

    const [sidebar,setSidebar] =
    useState(true);

    const [
        recommendations,
        setRecommendations
    ] =
    useState({});

    const [
        reports,
        setReports
    ] =
    useState([]);

    const [
        risks,
        setRisks
    ] =
    useState({});

    const [
        hotspots,
        setHotspots
    ] =
    useState([]);

    useEffect(()=>{

        const unsub =
        onSnapshot(

            collection(
                db,
                "reports"
            ),

            async snapshot=>{

                const data =
                snapshot.docs.map(
                    doc=>({

                        id:doc.id,

                        ...doc.data()

                    })
                );

                console.log(
                    "FIREBASE:",
                    data
                );

                setReports(
                    data
                );

                const result =
                await analyzeHotspots(
                    data
                );

                console.log(
                    "HOTSPOTS:",
                    result.hotspots
                );

                setHotspots(
                    result.hotspots || []
                );

                // AI Recommendations

                const recs = {};

                for(
                    const hotspot
                    of result.hotspots || []
                ){

                    const rec =
                    await getRecommendation(
                        hotspot
                    );

                    recs[
                        `${hotspot.lat}-${hotspot.lng}`
                    ] = rec;
                }

                setRecommendations(
                    recs
                );

                // AI Risk Engine

                const riskData = {};

                for(
                    const report
                    of data
                ){

                    const risk =
                    await getRisk(

                        report,

                        result.hotspots
                        ?
                        result.hotspots.length
                        :
                        0

                    );

                    riskData[
                        report.id
                    ] = risk;
                }

                setRisks(
                    riskData
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
BharatNirman AI Smart Map
</h1>

<MapContainer

center={[
26.4609135,
80.3217588
]}

zoom={12}

style={{

height:"75vh",
borderRadius:"20px"

}}

>

<TileLayer
url=
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


{/* HOTSPOTS */}

{

hotspots.map(

(h,index)=>

<Circle

key={index}

center={[

Number(h.lat),
Number(h.lng)

]}

radius={
h.count*500
}

pathOptions={{

color:

h.count>10
?
"#B71C1C"

:

h.count>5
?
"#EF6C00"

:
"#F9A825",

fillColor:

h.count>10
?
"#B71C1C"

:

h.count>5
?
"#EF6C00"

:
"#F9A825",

fillOpacity:0.35

}}

>

<Popup>

    <h3>
        Hotspot Analysis
    </h3>

    <p>
        Zone:
        HS-{index + 1}
    </p>

    <p>
        Complaints:
        {h.count}
    </p>

    <p>
        Risk:
        {
            h.count > 10
            ? "Critical"
            : h.count > 5
            ? "High"
            : "Moderate"
        }
    </p>

</Popup>

</Circle>
)

}

{/* MARKERS */}

<MarkerClusterGroup>

{

reports.map(report => {

    if(
        !report.latitude ||
        !report.longitude
    )
    return null;

    return(

        <Marker

            key={report.id}

            position={[

                Number(
                    report.latitude
                ),

                Number(
                    report.longitude
                )

            ]}

        >

            <Popup>

                <h3>
                    {report.title}
                </h3>

                <p>
                    {report.description}
                </p>

                <p>
                    Category:
                    {report.category}
                </p>

                <p>
                    Department:
                    {report.department}
                </p>

                <p>
                    Priority:
                    {report.priority}
                </p>

                <p>
                    Complaint:
                    {report.complaintId}
                </p>

                {

                    risks[report.id]

                    &&

                    <>

                        <hr/>

                        <p>
                            Risk Score:
                            <b>
                                {
                                    risks[
                                        report.id
                                    ].score
                                }
                                /100
                            </b>
                        </p>

                        <p>
                            Classification:
                            <b>
                                {
                                    risks[
                                        report.id
                                    ].level
                                }
                            </b>
                        </p>

                        <p>
                            Escalation:
                            <b>
                                {
                                    risks[
                                        report.id
                                    ].escalation
                                    ?
                                    " Required"
                                    :
                                    " No"
                                }
                            </b>
                        </p>

                    </>

                }

            </Popup>

        </Marker>

    );

})

}

</MarkerClusterGroup>
</MapContainer>


<div
style={{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:"20px",
    marginTop:"20px"
}}
>

    {/* HOTSPOT PANEL */}

    <div className="panel">

        <h2>
            AI Hotspot Analysis
        </h2>

        {

            hotspots.length===0

            ?

            <div className="report">
                No hotspots found
            </div>

            :

            hotspots.map(
                (h,i)=>

                <div
                    className="report"
                    key={i}
                >

                    <h4>
                        Hotspot ID:
                        HS-{i+1}
                    </h4>

                    <p>
                        Location:
                        {Number(h.lat).toFixed(3)},
                        {Number(h.lng).toFixed(3)}
                    </p>

                    <p>
                        Complaints:
                        {h.count}
                    </p>

                    <p>
                        Risk:
                        {
                            h.count>10
                            ?
                            " Critical"
                            :
                            h.count>5
                            ?
                            " High"
                            :
                            " Moderate"
                        }
                    </p>

                </div>
            )

        }

    </div>


    {/* RECOMMENDATION PANEL */}

    <div className="panel">

<h2>
AI Decision Support
</h2>

{

hotspots.map(

(h,i)=>{

const rec =

recommendations[
`${h.lat}-${h.lng}`
];

if(!rec)
return null;

return(

<div
className="report"
key={i}
>

<h4>
Zone:
HS-{i+1}
</h4>

<p>
Priority:
<b>
{rec.priority}
</b>
</p>

<p>
Risk Score:
<b>
{rec.risk}/100
</b>
</p>

<p>
Action:
{rec.action}
</p>

<p>
Resources:
{rec.resources}
</p>

<p>
Response:
{rec.eta}
</p>

<p>
AI Confidence:
{rec.confidence}%
</p>

</div>

);

}

)

}

</div>

</div>


{/* SYSTEM SUMMARY */}

<div
className="panel"
style={{
    marginTop:"20px"
}}
>

    <h2>
        System Summary
    </h2>

    <p>
        Total Reports:
        {" "}
        {reports.length}
    </p>

    <p>
        Total Hotspots:
        {" "}
        {hotspots.length}
    </p>

    <p>
        High Risk Zones:
        {" "}
        {
            hotspots.filter(
                h=>h.count>5
            ).length
        }
    </p>

    <p>
        Critical Zones:
        {" "}
        {
            hotspots.filter(
                h=>h.count>10
            ).length
        }
    </p>

</div>



<p>
Hotspots:
{hotspots.length}
</p>

</div>

</div>



</>

);

}
