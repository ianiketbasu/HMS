import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req?.cookies?.adminToken;
//   console.log("Admin token:", token);

  if (!token) {
    return next(new ErrorHandler("Admin not authenticated!", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "Admin") {
      return next(
        new ErrorHandler("Admin not authorized for this resource!", 403)
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token or expired session.", 401));
  }
});

export const isPatientAuthenticated = catchAsyncError(
  async (req, res, next) => {
    const token = req?.cookies?.patientToken;

    if (!token) {
      return next(new ErrorHandler("Patient not authenticated!", 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user || user.role !== "Patient") {
        return next(
          new ErrorHandler("Patient not authorized for this resource!", 403)
        );
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid token or expired session.", 401));
    }
  }
);
