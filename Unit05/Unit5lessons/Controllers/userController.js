const User = require("../Models/user");
const passport = require("passport");

const getUserParams = body => {
    return {
        name: { first: body.first, last: body.last },
        email: body.email,
        postcode: body.postcode
    };
};

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },

    indexView: (req, res) => {
        res.render("user/index");
    },

    new: (req, res) => {
        res.render("user/new");
    },

    create: (req, res, next) => {
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/user";
                next();
            } else {
                console.log(`Error saving user: ${error.message}`);
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = "/user/new";
                next();
            }
        });
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("user/show");
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("user/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, { $set: userParams })
            .then(user => {
                req.flash("success", `${user.fullName}'s account updated successfully!`);
                res.locals.redirect = `/user/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                res.locals.redirect = `/user/${userId}/edit`;
                req.flash("error", `Failed to update account because: ${error.message}.`);
                next();
            });
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndDelete(userId)
            .then(() => {
                req.flash("success", "User account deleted successfully!");
                res.locals.redirect = "/user";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                req.flash("error", `Failed to delete account because: ${error.message}.`);
                res.locals.redirect = "/user";
                next();
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    login: (req, res) => {
        res.render("user/login");
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    logout: (req, res, next) => {
        req.logout(function (error) {
            if (error) {
                console.log(`Error logging out: ${error.message}`);
            }
            req.flash("success", "You have been logged out!");
            res.locals.redirect = "/";
            next();
        });
    }
};