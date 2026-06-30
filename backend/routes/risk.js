const router =
require("express").Router();

const {
    calculateRisk
} =
require(
    "../services/riskEngine"
);

router.post(
    "/risk",
    (req,res)=>{

        const result =
        calculateRisk(

            req.body.report,

            req.body.hotspotCount
        );

        res.json(
            result
        );
    }
);

module.exports =
router;