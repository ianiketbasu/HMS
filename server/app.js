import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONT_END_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
