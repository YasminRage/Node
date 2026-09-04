const mongoose = require("mongoose"),
    { Schema } = mongoose,

    userSchema = new Schema({
        name: {
            first: {
                type: String,
                trim: true
                //no white space^
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
        password: {
            type: String,
            required: true
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
    if (user.subscribedAccount === undefined) {
        subscriber.findOne({
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(error => {
                console.log('Error in connecting subscriber: ${error.message');
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
module.exports = mongoose.model("User", userSchema);