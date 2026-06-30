const router=
require("express")
.Router();

const {
findCommunityIssue
}
=
require(
"../services/communityAI"
);

router.post(

"/community",

(req,res)=>{

const issue=
findCommunityIssue(

req.body.report,
req.body.reports

);

res.json({

duplicate:
!!issue,

issue

});

}

);

module.exports=
router;