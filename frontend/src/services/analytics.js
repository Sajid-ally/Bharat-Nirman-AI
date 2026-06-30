export async function getAnalytics(
    reports
){

    try{

        const response =
        await fetch(

            "http://localhost:5000/api/analytics",

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

        return await response.json();

    }

    catch(err){

        console.log(err);

        return{

            total:0,
            pending:0,
            resolved:0,

            departments:{},

            categories:{},

            severity:{},

            monthly:{},

            resolutionRate:0,

            aiConfidence:0,

            prediction:0

        };

    }

}