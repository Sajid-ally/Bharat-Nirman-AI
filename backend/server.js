require("dotenv").config();

console.log(
    "GEMINI:",
    process.env.GEMINI_API_KEY
);
const express = require("express");
const cors = require("cors");

const app = express();
const riskRoute =
require(
    "./routes/risk"
);
app.use(cors());
app.use(express.json());
const recommendationRoute =
require("./routes/recommendation");
const trackerRoute =
require(
    "./routes/tracker"
);

app.use(
    "/api",
    trackerRoute
);
const alertRoute =
require(
    "./routes/alert"
);

app.use(
    "/api",
    alertRoute
);
const analyticsRoute =
require("./routes/analytics");
const aiRoute =
require("./routes/ai");
app.use(
    "/api",
    aiRoute
);
app.use(
    "/api",
    recommendationRoute
);
app.use(
    "/api",
    riskRoute
);
app.use(
    "/api",
    analyticsRoute
);
function findHotspots(reports) {

    const zones = {};

    reports.forEach(report => {

        const lat = report.latitude;
        const lng = report.longitude;

        if (!lat || !lng)
            return;

        const key =
            `${Math.round(lat * 100)}-${Math.round(lng * 100)}`;

        if (!zones[key]) {

            zones[key] = {
                lat,
                lng,
                count: 0,
                reports: [],
                categories: {}
            };
        }

        zones[key].count++;

        zones[key].reports.push(report);

        const category =
            report.category || "Other";

        zones[key].categories[category] =
            (zones[key].categories[category] || 0) + 1;
    });

    return Object
        .values(zones)
        .sort((a, b) => b.count - a.count);
}

function checkDuplicate(title, reports) {

    return reports.find(
        r =>
            r.title
                .toLowerCase()
                .includes(
                    title.toLowerCase()
                )
    );
}

app.post(
    "/api/analyze",
    (req, res) => {

        const hotspots =
            findHotspots(
                req.body.reports
            );

        res.json({
            hotspots
        });
    }
);

app.post(
    "/api/duplicate",
    (req, res) => {

        const duplicate =
            checkDuplicate(
                req.body.title,
                req.body.reports
            );

        res.json({
            duplicate
        });
    }
);

app.get(
    "/",
    (req, res) => {

        res.json({
            status:
                "BharatNirman AI Backend Running"
        });
    }
);

const PORT =
process.env.PORT || 8080;

app.listen(
    PORT,
    ()=>{
        console.log(
            `Backend running on port ${PORT}`
        );
    }
);