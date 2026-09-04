const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    maxStudents: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    subscribers: [{ type: Schema.Types.ObjectId, ref: "Subscriber" }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);