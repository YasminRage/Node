var courses = [
    { title: "Carrot Cake", cost: 20 },
    { title: "Chocolate Fudge Cake", cost: 30 },
    { title: "Lemon Layer Cake", cost: 50 }
];

module.exports = {
    showCourses: (req, res) => {
        res.render("courses", { offeredCourses: courses });
    },

    index: (req, res) => {
        res.render("index");
    },

    respondWithName: (req, res) => {
        let paramsName = req.params.myName;
        res.render("index", { name: paramsName });
    },

    showSignUp: (req, res) => {
        res.render("contact");
    },

    postedSignUpForm: (req, res) => {
        res.render("thanks");
    },

    logRequestPaths: (req, res, next) => {
        console.log(`request made to: ${req.url}`);
        next();
    }
};
