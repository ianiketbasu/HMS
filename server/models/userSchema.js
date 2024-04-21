import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "firstName must contain at least 3 characters!!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "lastName must contain at least 3 characters!!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email!!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain 10 digits!!"],
    maxLength: [10, "Phone number must contain 10 digits!!"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [13, "NIC must contain exact 13 digits!!"],
    maxLength: [13, "NIC must contain exact 13 digits!!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!!"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    minLength: [6, "Password must contain 6 digits or characters!!"],
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  doAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
