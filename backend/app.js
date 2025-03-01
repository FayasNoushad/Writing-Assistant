const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const draftRouter = require("./routes/draft");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/draft", draftRouter);

const db = require("./config/connection");
db.connect((err) => {
  if (err) {
    console.log("Connection error " + err);
  } else {
    console.log("Database connected");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

module.exports = app;
