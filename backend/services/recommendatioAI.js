const {
    runAI
} =
require("./alertEngine");

async function recommend(hotspot){

    const prompt = `

You are a government emergency planner.

Hotspot:

Complaints:
${hotspot.count}

Latitude:
${hotspot.lat}

Longitude:
${hotspot.lng}

Return JSON:

{
    "priority":"",
    "risk":0,
    "action":"",
    "resources":"",
    "eta":"",
    "confidence":0
}

`;

    const result =
    await runAI(prompt);

    try{
        return JSON.parse(result);
    }

    catch{

        return{
            priority:"Medium",
            risk:50,
            action:"Inspection",
            resources:"1 Team",
            eta:"24 Hours",
            confidence:60
        };
    }
}

module.exports = {
    recommend
};