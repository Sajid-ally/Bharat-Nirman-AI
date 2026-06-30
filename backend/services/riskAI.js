const {
    runAI
} =
require("./aiEngine");

async function getRisk(report,hotspots){

    const prompt = `

You are a Smart City AI.

Analyze this complaint.

Title:
${report.title}

Description:
${report.description}

Category:
${report.category}

Severity:
${report.severity}

Priority:
${report.priority}

Nearby Hotspots:
${hotspots}

Return ONLY JSON:

{
    "score":0,
    "level":"",
    "escalation":false,
    "reason":""
}

`;

    const result =
    await runAI(prompt);

    try{
        return JSON.parse(result);
    }

    catch{

        return{
            score:50,
            level:"Medium",
            escalation:false,
            reason:"Fallback"
        };
    }
}

module.exports = {
    getRisk
};