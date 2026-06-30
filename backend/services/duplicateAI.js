const {
    runAI
} =
require("./alertEngine");

async function checkDuplicate(a,b){

    const prompt = `

Complaint A:
${a.title}
${a.description}

Complaint B:
${b.title}
${b.description}

Are these duplicates?

Return JSON:

{
    "duplicate":false,
    "confidence":0,
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
            duplicate:false,
            confidence:0,
            reason:""
        };
    }
}

module.exports = {
    checkDuplicate
};