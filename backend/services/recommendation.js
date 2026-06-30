function recommend(hotspot){

    const complaints =
        hotspot.count || 0;

    let priority;
    let action;
    let resources;
    let eta;
    let risk;

    if(complaints >= 10){

        priority =
            "Critical";

        risk =
            95;

        action =
            "Deploy emergency response teams immediately and escalate to district administration.";

        resources =
            "4 Field Teams, 2 Supervisors, Emergency Vehicle";

        eta =
            "0-6 Hours";
    }

    else if(complaints >= 5){

        priority =
            "High";

        risk =
            80;

        action =
            "Increase monitoring and deploy municipal staff.";

        resources =
            "2 Field Teams, 1 Supervisor";

        eta =
            "6-24 Hours";
    }

    else{

        priority =
            "Moderate";

        risk =
            60;

        action =
            "Schedule routine inspection.";

        resources =
            "1 Inspection Team";

        eta =
            "1-3 Days";
    }

    return{

        priority,
        risk,
        action,
        resources,
        eta,

        confidence:
        Math.min(
            95,
            60 + complaints*3
        )
    };
}

module.exports = {
    recommend
};