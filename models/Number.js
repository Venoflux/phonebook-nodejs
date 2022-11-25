const mongoose = require("mongoose");

const NumberSchema = new mongoose.Schema(
  {
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
      match: [/^[\d]+$/, "Please provide a valid phone number"],
      maxlength: 15,
      minlength: 7,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Number", NumberSchema);
