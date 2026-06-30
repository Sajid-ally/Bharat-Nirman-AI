const router =
require("express").Router();

const {
    recommend
}
=
require(
    "../services/recommendation"
);

router.post(

    "/recommend",

    (req,res)=>{

        const hotspot =
            req.body.hotspot;

        const result =
            recommend(
                hotspot
            );

        res.json(
            result
        );
    }

);

module.exports =
router;