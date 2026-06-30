export async function analyzeHotspots(
    reports
){

    try{

        const response =
        await fetch(

            "http://localhost:5000/api/analyze",

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify({
                    reports
                })

            }

        );

        const data =
        await response.json();

        console.log(
            "API:",
            data
        );

        return data;

    }

    catch(err){

        console.log(err);

        return {
            hotspots:[]
        };

    }

}