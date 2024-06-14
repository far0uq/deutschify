const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Enable credentials (cookies)
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/question", require("./routes/questionRoutes"));

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
