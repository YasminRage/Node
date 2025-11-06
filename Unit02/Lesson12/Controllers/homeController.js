var courses = [
    {
        title: "Carrot Cake",
        cost: 20
    },
    {
        title: "Choclate Fudge Cake",
        cost: 30
    },
    {
        title: "Lemon Layer Cake",
        cost: 50
    }
];

exports.showCourses = (req, res) => {
    res.render("courses", {
        offeredCourses: courses
    });
};

exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
    res.render("index", { name: paramsName });
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};