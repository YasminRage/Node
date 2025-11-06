const mongoose = require("mongoose");
module.exports = mongoose.model("Subscriber", subscriberSchema);

const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});
