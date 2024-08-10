import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = new express();



app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev")); //HTTP request logger middleware for node.js 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN); // The origin you want to allow
    res.header('Access-Control-Allow-Credentials', 'true');            // Allow credentials
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH'); // Other headers as needed
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');     // Other headers as needed
    next();
  });

//routes import
import userRoute from "./routes/user.routes.js";
import gigRoute from "./routes/gig.routes.js";
import orderRoute from "./routes/order.routes.js";
import conversationRoute from "./routes/conversation.routes.js";
import messageRoute from "./routes/message.routes.js";
import reviewRoute from "./routes/review.routes.js";
import authRoute from "./routes/auth.routes.js";

//routes declaration
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);


export default app;