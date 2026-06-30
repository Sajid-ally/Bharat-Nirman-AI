function similarity(a,b){

a=a.toLowerCase();
b=b.toLowerCase();

const wa=a.split(" ");
const wb=b.split(" ");

let common=0;

wa.forEach(word=>{

if(
wb.includes(word)
)
common++;

});

return common/
Math.max(
wa.length,
wb.length
);

}

function findCommunityIssue(
report,
reports
){

for(
const r
of reports
){

const score=
similarity(

report.title+
report.description,

r.title+
r.description

);

const dist=

Math.abs(
report.latitude-r.latitude
)+
Math.abs(
report.longitude-r.longitude
);

if(
score>0.35 &&
dist<0.05
){

return r;

}

}

return null;

}

module.exports={
findCommunityIssue
};