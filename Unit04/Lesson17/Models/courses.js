const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
            type: String,
            required: true
        },
        items: [],
        postcode: {
            type: String,
            minlength: 5,
            maxlength: 8
        }
    });
module.exports = mongoose.model("Course", courseSchema);