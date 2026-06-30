export async function
getRecommendation(
hotspot
){

const response=
await fetch(

"http://localhost:5000/api/recommend",

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