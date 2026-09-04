const Course = require("../Models/course");
const User = require("../Models/user");
const httpStatus = require("http-status-codes");

const getCourseParams = body => {
    return {
        title: body.title,
        description: body.description,
        maxStudents: body.maxStudents,
        cost: body.cost
    };
};

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
        let courseParams = getCourseParams(req.body);
        Course.create(courseParams)
            .then(course => {
                req.flash("success", `${course.title} was added successfully!`);
                res.locals.redirect = "/course";
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error saving course: ${error.message}`);
                res.locals.redirect = "/course/new";
                req.flash("error", `Failed to add course because: ${error.message}.`);
                next();
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
            courseParams = getCourseParams(req.body);
        Course.findByIdAndUpdate(courseId, { $set: courseParams })
            .then(course => {
                req.flash("success", `${course.title} updated successfully!`);
                res.locals.redirect = `/course/${courseId}`;
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`Error updating course by ID: ${error.message}`);
                res.locals.redirect = `/course/${courseId}/edit`;
                req.flash("error", `Failed to update course because: ${error.message}.`);
                next();
            });
    },

    delete: (req, res, next) => {
        let courseId = req.params.id;
        Course.findByIdAndDelete(courseId)
            .then(() => {
                req.flash("success", "Course deleted successfully!");
                res.locals.redirect = "/course";
                next();
            })
            .catch(error => {
                console.log(`Error deleting course by ID: ${error.message}`);
                req.flash("error", `Failed to delete course because: ${error.message}.`);
                res.locals.redirect = "/course";
                next();
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },

    errorJSON: (error, req, res, next) => {
        let errorObject = error
            ? { status: httpStatus.INTERNAL_SERVER_ERROR, message: error.message }
            : { status: httpStatus.INTERNAL_SERVER_ERROR, message: "Unknown Error." };
        res.json(errorObject);
    },

    join: (req, res, next) => {
        let courseId = req.params.id,
            currentUser = req.user;

        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: { courses: courseId }
            })
                .then(() => {
                    res.locals.success = true;
                    next();
                })
                .catch(error => next(error));
        } else {
            next(new Error("User must log in."));
        }
    },

    filterUserCourses: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if (currentUser) {
            let mappedCourses = res.locals.courses.map(course => {
                let userJoined = currentUser.courses.some(userCourse => userCourse.equals(course._id));
                return Object.assign(course.toObject(), { joined: userJoined });
            });
            res.locals.courses = mappedCourses;
            next();
        } else {
            next();
        }
    }
};