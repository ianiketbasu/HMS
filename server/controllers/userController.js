import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role,
    nic,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !role ||
    !nic
  ) {
    return next(new ErrorHandler("Please fill out the full form!!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role,
    nic,
  });

  generateToken(user, "User registered successfully!!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provide all details!!", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password do not match!!", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password!!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password!!", 400));
  }

  if (role !== user.role) {
    return next(
      new ErrorHandler(`User with this role: ${role}, not found!!`, 400)
    );
  }

  generateToken(user, "User logged in successfully!!", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please fill out the full form!!", 400));
  }

  const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(
      new ErrorHandler("Admin with this email, already exists!!", 400)
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New admin registered successfully!!",
  });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully!!",
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logged out successfully!!",
    });
});
