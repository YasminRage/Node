const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      unique: true
    },
    postcode: {
      type: String,
      minlength: 5,
      maxlength: 8
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Course"}]
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Zip Code:
 ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function () {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec();
};

