export async function getAIRisk(
    report,
    hotspots
){

    const response =
    await fetch(

        "http://localhost:5000/api/risk",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify({

                report,
                hotspots

            })
        }
    );

    return await response.json();
}


export async function getAIExplanation(
    report
){

    const response =
    await fetch(

        "http://localhost:5000/api/explain",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify({

                report

            })
        }
    );

    return await response.json();
}


export async function getAIAlert(
    hotspot
){

    const response =
    await fetch(

        "http://localhost:5000/api/alert",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify({

                hotspot

            })
        }
    );

    return await response.json();
}


export async function getAIPrediction(
    stats
){

    const response =
    await fetch(

        "http://localhost:5000/api/predict",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify({

                stats

            })
        }
    );

    return await response.json();
}