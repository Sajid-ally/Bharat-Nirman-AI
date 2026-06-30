const {
    runAI
} =
require("./aiEngine");

async function askCivicAI(question){

    const prompt = `

You are BharatNirman AI.

Analyze this civic query:

${question}

Provide:
- analysis
- responsible department
- urgency
- recommendation

`;

    return await runAI(prompt);
}

module.exports = {
    askCivicAI
};