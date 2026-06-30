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

function distance(
a,
b
){

if(
!a.latitude ||
!b.latitude
)
return 999;

return Math.sqrt(

Math.pow(
a.latitude-b.latitude,
2
)

+

Math.pow(
a.longitude-b.longitude,
2
)

);

}

function checkDuplicate(

report,
reports

){

for(
const r
of reports
){

const sim=
similarity(

report.title+
" "+
report.description,

r.title+
" "+
r.description

);

const dist=
distance(
report,
r
);

const category=
report.category===
r.category;

const score=

(sim*0.5)

+

(category?0.3:0)

+

(dist<0.02?0.2:0);

if(score>0.6){

return{

duplicate:true,

score:
Math.round(
score*100
),

complaint:
r

};

}

}

return{

duplicate:false

};

}

module.exports={
checkDuplicate
};