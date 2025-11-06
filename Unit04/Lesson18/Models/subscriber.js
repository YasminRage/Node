const mongoose = require("mongoose")


const subscriberSchema = new mongoose.Schema({
    //key-value pair
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

  //creating a brand new model and exporting it. 
module.exports = mongoose.model("Subscriber", subscriberSchema);

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Postcode:
 ${this.postcode}`;
};
//Get.info returns the subscriber's information 

subscriberSchema.methods.findLocalSubscribers = function () {
  return this.model("Subscriber")
    .find({ zipCode: this.postcode})
    .exec();
};
