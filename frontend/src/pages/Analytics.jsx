import {
    useEffect,
    useState
} from "react";

import {
    collection,
    onSnapshot
} from "firebase/firestore";

import {
    db
} from "../services/firebase";

import {
    getAnalytics
} from "../services/analytics";

import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from "recharts";

const COLORS = [

    "#FF9933", // saffron
    "#FFFFFF",
    "#138808", // green
    "#000080", // navy
    "#046A38"

];
export default function Analytics() {

    const [sidebar, setSidebar] =
        useState(true);

    const [stats, setStats] =
        useState(null);

    useEffect(() => {

        const unsub =
            onSnapshot(

                collection(
                    db,
                    "reports"
                ),

                async (snapshot) => {

                    const reports =
                        snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                ...doc.data()
                            })
                        );

                    console.log(
                        "REPORTS:",
                        reports
                    );

                    const result =
                        await getAnalytics(
                            reports
                        );

                    console.log(
                        "ANALYTICS:",
                        result
                    );

                    setStats(
                        result
                    );
                }
            );

        return () => unsub();

    }, []);

    if (!stats) {

        return (
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
                            padding: "20px"
                        }}
                    >
                        <h2>
                            Loading Analytics...
                        </h2>
                    </div>

                </div>
            </>
        );
    }

    const departmentData =
        Object
            .entries(
                stats.departments || {}
            )
            .map(
                ([k, v]) => ({
                    name: k,
                    value: v
                })
            );

    const severityData =
        Object
            .entries(
                stats.severity || {}
            )
            .map(
                ([k, v]) => ({
                    name: k,
                    value: v
                })
            );

    console.log(
        "DEPARTMENT:",
        departmentData
    );

    console.log(
        "SEVERITY:",
        severityData
    );

    return (

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
                        flex: 1,
                        padding: "20px"
                    }}
                >

                    <h1>
                        BharatNirman AI Analytics
                    </h1>

                    {/* TOP STATS */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4,1fr)",
                            gap: "20px"
                        }}
                    >

                        <div className="panel">
                            <h3>
                                Total Reports
                            </h3>
                            <h1>
                                {stats.total}
                            </h1>
                        </div>

                        <div className="panel">
                            <h3>
                                Pending
                            </h3>
                            <h1>
                                {stats.pending}
                            </h1>
                        </div>

                        <div className="panel">
                            <h3>
                                Resolved
                            </h3>
                            <h1>
                                {stats.resolved}
                            </h1>
                        </div>

                        <div className="panel">
                            <h3>
                                Resolution Rate
                            </h3>
                            <h1>
                                {stats.resolutionRate}%
                            </h1>
                        </div>

                    </div>

                    <br />

                    {/* DEPARTMENT GRAPH */}

                    <div className="panel">

                        <h2>
                            Department Performance
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={
                                    departmentData
                                }
                            >

                                <XAxis
                                    dataKey="name"
                                    stroke="#000"
                                />

                                <YAxis
                                    stroke="#000"
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="value"
                                    fill="#0F62FE"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    <br />

                    {/* PIE CHART */}

                    <div className="panel">

                        <h2>
                            Severity Distribution
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={
                                        severityData
                                    }
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    label
                                >

                                    {
                                        severityData.map(
                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />

                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>


<br />

<div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(5,1fr)",
        gap: "20px"
    }}
>

    <div className="panel">

        <h2>
            AI Confidence
        </h2>

        <h1>
            {stats.aiConfidence}%
        </h1>

        <p>
            Prediction reliability
        </p>

    </div>

    <div className="panel">

        <h2>
            Data Quality
        </h2>

        <h1>
            {stats.dataQuality}%
        </h1>

        <p>
            Metadata completeness
        </p>

    </div>

    <div className="panel">

        <h2>
            Risk Index
        </h2>

        <h1>
            {stats.riskScore}/100
        </h1>

        <p>
            Current civic risk
        </p>

    </div>

    <div className="panel">

        <h2>
            Department Efficiency
        </h2>

        <h1>
            {stats.departmentEfficiency}%
        </h1>

        <p>
            Resolution performance
        </p>

    </div>

    <div className="panel">

        <h2>
            Prediction Engine
        </h2>

        <h1>
            {stats.prediction}
        </h1>

        <p>
            Estimated complaints next month
        </p>

    </div>

</div>

                </div>

            </div>

        </>

    );

}