export async function
getTracker(
    report
){

    const response =
    await fetch(

        "http://localhost:5000/api/tracker",

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

    return await
    response.json();
}