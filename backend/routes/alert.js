const router =
require("express").Router();

const {
    generateAlert
} =
require(
    "../services/alertEngine"
);

router.post(
    "/alert",
    async(req,res)=>{

        const result =
        await generateAlert(
            req.body.hotspot
        );

        res.json(
            result
        );
    }
);

module.exports =
router;