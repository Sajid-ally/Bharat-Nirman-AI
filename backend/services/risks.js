function calculateRisk(report){

    let score = 0;

    if(report.severity==="High")
        score += 40;

    if(report.priority==="Urgent")
        score += 30;

    if(report.category==="Garbage")
        score += 10;

    if(report.category==="Road")
        score += 20;

    if(report.status==="Pending")
        score += 20;

    return Math.min(score,100);
}

module.exports = {
    calculateRisk
};