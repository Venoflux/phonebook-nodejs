const mongoose = require("mongoose");

const NumberSchema = new mongoose.Schema({
  numbername: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  countrycode: {
    type: String,
    required: [true, "Please provide country code"],
    match: [/^(\+\d*)/, "Please provide a valid country code"],
  },
  phonenumber: {
    type: String,
    required: [true, "Please provide phone number"],
    match: [
      /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
      "Please provide a valid phone number",
    ],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("Number", NumberSchema);
