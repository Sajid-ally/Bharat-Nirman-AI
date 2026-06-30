function getTracker(report) {

    const created =
        report.created?.seconds
        ?
        new Date(
            report.created.seconds * 1000
        )
        :
        new Date();

    const now = new Date();

    const days =
        Math.floor(
            (now - created)
            /
            (1000 * 60 * 60 * 24)
        );

    let progress = 20;

    if(days > 1)
        progress = 40;

    if(days > 3)
        progress = 60;

    if(days > 5)
        progress = 80;

    if(report.status === "Resolved")
        progress = 100;

    return {

        complaintId:
            report.complaintId,

        department:
            report.department,

        status:
            report.status || "Pending",

        officer:
            assignOfficer(
                report.department
            ),

        progress,

        created:
            created.toDateString(),

        expected:
            new Date(
                created.getTime()
                +
                (3*24*60*60*1000)
            ).toDateString(),

        timeline:[

            {
                step:
                    "Complaint Registered",
                done:true
            },

            {
                step:
                    "AI Categorized",
                done:true
            },

            {
                step:
                    "Department Assigned",
                done:true
            },

            {
                step:
                    "Officer Assigned",
                done:progress>=40
            },

            {
                step:
                    "Inspection",
                done:progress>=60
            },

            {
                step:
                    "Resolved",
                done:progress===100
            }

        ]
    };
}

function assignOfficer(department){

    const officers={

        "Nagar Nigam":
            "Rajesh Kumar",

        "Municipal Corporation":
            "Anita Singh",

        "PWD":
            "Vikas Sharma",

        "Police":
            "Amit Verma"
    };

    return officers[
        department
    ] || "Assigned Officer";
}

module.exports={
    getTracker
};