const mongoose = require("mongoose");
const validator = require("validator");
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Employee Name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    photo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: String,
      length: [11, "Phone number must be 11 digits"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin"],
    },
    __v: false,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userModel);

module.exports = UserModel;
