const router =
require("express").Router();

const {
    getTracker
} =
require(
    "../services/tracker"
);

router.post(

    "/tracker",

    (req,res)=>{

        const result =
        getTracker(
            req.body.report
        );

        res.json(
            result
        );
    }
);

module.exports =
router;