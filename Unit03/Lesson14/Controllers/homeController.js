var courses = [
    {
        title: "Event Driven Cakes",
        cost: 50
    },
    {
        title: "Asynchronous Artichoke",
        cost: 25
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 10
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

exports.showCourses = (req, res) => {
    res.render("courses");
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};