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

module.exports = {
    showCourses: (req, res) => {
        res.render("courses", {
            offeredCourses: courses
        });
    }
};