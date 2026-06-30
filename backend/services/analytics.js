function generateAnalytics(reports) {

    const stats = {

        total: reports.length,

        pending: 0,

        resolved: 0,

        departments: {},

        categories: {},

        severity: {},

        monthly: {},

        resolutionRate: 0,

        aiConfidence: 0,

        dataQuality: 0,

        prediction: 0,

        departmentEfficiency: 0,

        riskScore: 0
    };

    reports.forEach(r => {

        // STATUS
        if (r.status === "Resolved")
            stats.resolved++;
        else
            stats.pending++;

        // DEPARTMENT
        const dept =
            r.department || "Unknown";

        stats.departments[dept] =
            (stats.departments[dept] || 0) + 1;

        // CATEGORY
        const cat =
            r.category || "Other";

        stats.categories[cat] =
            (stats.categories[cat] || 0) + 1;

        // SEVERITY
        const sev =
            r.severity || "Unknown";

        stats.severity[sev] =
            (stats.severity[sev] || 0) + 1;

        // MONTH
        const month =
            new Date(
                r.created?.seconds
                    ? r.created.seconds * 1000
                    : Date.now()
            ).toLocaleString(
                "default",
                { month: "short" }
            );

        stats.monthly[month] =
            (stats.monthly[month] || 0) + 1;
    });

    // RESOLUTION RATE
    stats.resolutionRate =
        stats.total
            ?
            Math.round(
                stats.resolved *
                100 /
                stats.total
            )
            :
            0;

    // DATA QUALITY
    let quality = 0;

    reports.forEach(r => {

        if (r.category) quality += 20;
        if (r.severity) quality += 20;
        if (r.department) quality += 20;
        if (r.latitude) quality += 20;

        if (
            r.description &&
            r.description.length > 30
        )
            quality += 20;

    });

    stats.dataQuality =
        reports.length
            ?
            Math.round(
                quality /
                reports.length
            )
            :
            0;

    // AI CONFIDENCE
    let confidence = 50;

    confidence +=
        Math.min(
            stats.total * 3,
            15
        );

    confidence +=
        Object.keys(
            stats.categories
        ).length * 5;

    confidence +=
        Object.keys(
            stats.departments
        ).length * 5;

    if (
        stats.resolutionRate > 50
    )
        confidence += 10;

    stats.aiConfidence =
        Math.min(
            confidence,
            90
        );

    // DEPARTMENT EFFICIENCY
    stats.departmentEfficiency =
        stats.total
            ?
            Math.round(
                stats.resolved *
                100 /
                stats.total
            )
            :
            0;

    // RISK SCORE
    let risk = 0;

    risk +=
        stats.pending * 15;

    risk +=
        (
            stats.severity.High || 0
        ) * 10;

    stats.riskScore =
        Math.min(
            risk,
            100
        );

    // PREDICTION
    const monthly =
        Object.values(
            stats.monthly
        );

    if (
        monthly.length > 1 &&
        monthly[0] > 0
    ) {

        const growth =
            monthly[
                monthly.length - 1
            ] /
            monthly[0];

        stats.prediction =
            Math.round(
                stats.total *
                growth
            );
    }
    else {

        stats.prediction =
            stats.total + 2;
    }

    return stats;
}

module.exports = {
    generateAnalytics
};