export async function
checkCommunityIssue(

report,
reports

){

const response=
await fetch(

"http://localhost:5000/api/community",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

report,
reports

})

}

);

return await response.json();

}