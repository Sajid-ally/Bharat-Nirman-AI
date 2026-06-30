const {
    runAI
} =
require("./aiEngine");

async function generateAlert(hotspot){

    const prompt = `

Analyze this civic hotspot.

Complaints:
${hotspot.count}

Return ONLY JSON:

{
    "alert":"",
    "severity":"",
    "department":"",
    "action":"",
    "publicWarning":false
}

`;

    const result =
    await runAI(prompt);

    try{

        return JSON.parse(result);

    }

    catch{

        return{

            alert:
            "Normal activity",

            severity:
            "Low",

            department:
            "Municipal Corporation",

            action:
            "Routine inspection",

            publicWarning:
            false

        };

    }

}

module.exports = {
    generateAlert
};