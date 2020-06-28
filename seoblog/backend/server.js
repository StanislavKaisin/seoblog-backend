const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
// routes
const blogRoutes = require("./routes/blog.js");
const authRoutes = require("./routes/auth.js");
//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log(`DB connected! Yeah!`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
//routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

//cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//seoAdmin
//seoAdmin

//mongodb+srv://seoAdmin:seoAdmin@cluster0-vizvr.mongodb.net/SEOBLOG?retryWrites=true&w=majority
