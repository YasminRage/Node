const Course = require("../Models/course");

module.exports = {
    index: (req, res, next) => {
        Course.find()
            .then(courses => {
                res.locals.courses = courses;
                next();
            })
            .catch(error => {
                console.log(`Error fetching courses: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("course/index");
    },
    new: (req, res) => {
        res.render("course/new");
    },
    create: (req, res, next) => {
        let courseParams = {
            title: req.body.title,
            description: req.body.description,
            maxStudents: req.body.maxStudents,
            cost: req.body.cost
        };
        Course.create(courseParams)
            .then(course => {
                res.locals.redirect = "/course";
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error saving course: ${error.message}`);
                next(error);
            });
    },
    show: (req, res, next) => {
        let courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error fetching course by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("course/show");
    },
    edit: (req, res, next) => {
        let courseId = req.params.id;
        Course.findById(courseId)
            .then(course => {
                res.render("course/edit", { course: course });
            })
            .catch(error => {
                console.log(`Error fetching course by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let courseId = req.params.id,
            courseParams = {
                title: req.body.title,
                description: req.body.description,
                maxStudents: req.body.maxStudents,
                cost: req.body.cost
            };
        Course.findByIdAndUpdate(courseId, { $set: courseParams })
            .then(course => {
                res.locals.redirect = `/course/${courseId}`;
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error updating course by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let courseId = req.params.id;
        Course.findByIdAndDelete(courseId)
            .then(() => {
                res.locals.redirect = "/course";
                next();
            })
            .catch(error => {
                console.log(`Error deleting course by ID: ${error.message}`);
                next();
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }
};