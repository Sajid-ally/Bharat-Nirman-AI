function calculateRisk(report, hotspotCount = 1) {

    let risk = 0;

    // severity
    if (report.severity === "High")
        risk += 35;
    else if (report.severity === "Medium")
        risk += 20;
    else
        risk += 10;

    // priority
    if (report.priority === "Urgent")
        risk += 20;
    else if (report.priority === "High")
        risk += 15;

    // hotspot density
    risk += Math.min(
        hotspotCount * 5,
        20
    );

    // pending
    if (report.status !== "Resolved")
        risk += 15;

    // description quality
    if (
        report.description &&
        report.description.length > 50
    )
        risk += 10;

    risk = Math.min(risk, 100);

    return {

        score: risk,

        level:
            risk >= 80
                ? "Critical"
                :
                risk >= 60
                ? "High"
                :
                risk >= 40
                ? "Moderate"
                :
                "Low",

        escalation:
            risk >= 80
    };
}

module.exports = {
    calculateRisk
};