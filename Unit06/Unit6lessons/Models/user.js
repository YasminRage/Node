const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subscriber = require("./subscriber");
const passportLocalMongoose = require("passport-local-mongoose").default;
const randToken = require("rand-token");

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    postcode: {
        type: String,
        required: true
    },
    apiToken: {
        type: String
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: {
        type: Schema.Types.ObjectId, ref: "Subscriber"
    }
}, {
    timestamps: true
});

userSchema.pre("save", function (next) {
    let user = this;
    if (!user.apiToken) user.apiToken = randToken.generate(16);
    next();
});

userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({ email: user.email })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error in connecting subscriber: ${error.message}`);
                next(error);
            });
    } else {
        next();
    }
});

userSchema.virtual("fullName")
    .get(function () {
        return `${this.name.first} ${this.name.last}`;
    });

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);