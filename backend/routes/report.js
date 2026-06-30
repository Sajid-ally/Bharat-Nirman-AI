const router=
require("express").Router();

const {
findHotspots
}
=
require("../services/hotspot");

const {
checkDuplicate
}
=
require("../services/duplicate");


router.post(

"/analyze",

(req,res)=>{

const reports=
req.body.reports;

res.json({

hotspots:
findHotspots(
reports
)

});

}

);

router.post(

"/duplicate",

(req,res)=>{

res.json({

duplicate:
checkDuplicate(

req.body.title,
req.body.reports

)

});

}

);

module.exports=
router;