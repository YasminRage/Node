const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  postcode: {
    type: String
  },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Subscriber", subscriberSchema);