exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
    res.render("index", { name: paramsName });
};

var courses = [
  {
    title: "Cheesecake",
    cost: 50
  },
  {
    title: "Cherry Trifle",
    cost: 25
  },
  {
    title: "Tiramisu",
    cost: 10
  }
];

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

