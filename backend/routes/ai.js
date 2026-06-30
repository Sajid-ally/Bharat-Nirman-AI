const router =
require("express").Router();

const {
    askCivicAI
} =
require("../services/civicAssistant");

router.post(
    "/ai",

    async(req,res)=>{

        try{

            const answer =
            await askCivicAI(
                req.body.prompt
            );

            res.json({
                answer
            });

        }

        catch(err){

            console.log(err);

            res.status(500).json({
                error:"AI failed"
            });
        }

    }
);

module.exports =
router;