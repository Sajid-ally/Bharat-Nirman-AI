import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API
);

export async function analyzeIssue(
    title,
    description
){

    try{

        const model =
        genAI.getGenerativeModel({
            model:"gemini-2.5-flash"
        });

        const prompt = `
You are BharatNirman AI, an Indian Government civic issue analysis system.

Analyze the following civic complaint.

TITLE:
${title}

DESCRIPTION:
${description}

Determine:

1. category
2. severity
3. department
4. priority

Categories:
- Road
- Garbage
- Water
- Electricity
- Drainage
- Public Safety

Departments:
- PWD
- Nagar Nigam
- Jal Nigam
- Electricity Board
- Police
- Municipal Corporation

Return ONLY valid JSON.

Example:

{
    "category":"Road",
    "severity":"High",
    "department":"PWD",
    "priority":"Urgent"
}
`;

        const result =
        await model.generateContent(
            prompt
        );

        let text =
        result.response.text();

        console.log(
            "Gemini Raw:",
            text
        );

        // Remove markdown formatting
        text =
        text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

        const parsed =
        JSON.parse(text);

        return parsed;

    }
    catch(error){

        console.error(
            "Gemini Error:",
            error
        );

        // fallback so UI never crashes
        return {

            category:
            "Road",

            severity:
            "Medium",

            department:
            "PWD",

            priority:
            "Normal"

        };
    }
}