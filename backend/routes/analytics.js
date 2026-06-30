const router =
require("express").Router();

const {
    generateAnalytics
}
=
require(
    "../services/analytics"
);

router.post(

    "/analytics",

    (req,res)=>{

        const reports =
            req.body?.reports
            ||
            [];

        const result =
            generateAnalytics(
                reports
            );

        res.json(
            result
        );

    }

);

module.exports =
router;