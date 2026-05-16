const express = require("express");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");
const app = express();
const cookie = require("cookie-parser");
const cors = require('cors')

app.use(express.json());
app.use(cookie());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;