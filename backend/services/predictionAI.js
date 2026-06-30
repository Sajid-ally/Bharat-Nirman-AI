const {
    runAI
} =
require("./alertEngine");

async function predict(stats){

    const prompt = `

Monthly complaint data:

${JSON.stringify(stats)}

Predict next month.

Return JSON:

{
    "prediction":0,
    "trend":"",
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
            prediction:0,
            trend:"Stable",
            reason:"No data"
        };
    }
}

module.exports = {
    predict
};