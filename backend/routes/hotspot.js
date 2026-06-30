function findHotspots(
reports
){

const zones={};

reports.forEach(r=>{

if(
!r.latitude
)
return;

const key=
`${Math.round(
r.latitude*100
)}
-
${Math.round(
r.longitude*100
)}`;

if(
!zones[key]
){

zones[key]={

count:0,
lat:r.latitude,
lng:r.longitude

};

}

zones[key]
.count++;

});

return Object
.values(zones)
.sort(
(a,b)=>
b.count-a.count
);

}

module.exports={
findHotspots
};