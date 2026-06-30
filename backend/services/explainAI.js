const {
    runAI
} =
require("./alertEngine");

async function explain(report){

    const prompt = `

Explain why this complaint received its classification.

${JSON.stringify(report)}

Return JSON:

{
    "explanation":"",
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
            explanation:
            "No explanation",
            confidence:0
        };
    }
}

module.exports = {
    explain
};