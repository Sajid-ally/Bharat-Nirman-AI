const {
    runAI
} =
require("./alertEngine");

async function generateAlert(hotspot){

    const prompt = `

Analyze this hotspot.

Complaints:
${hotspot.count}

Return JSON:

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
            alert:"Normal",
            severity:"Low",
            department:"Municipal",
            action:"Inspection",
            publicWarning:false
        };
    }
}

module.exports = {
    generateAlert
};