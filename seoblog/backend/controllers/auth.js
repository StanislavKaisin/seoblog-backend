const User = require("../models/user");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is taken" });
    }
    const { name, email, password } = req.body;
    let userName = shortid.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${userName}`;
    let newUser = new User({ name, email, password, profile, userName });
    newUser.save((error, success) => {
      if (error) {
        return res.status(400).json({ error });
      }
      // res.json({ user: success });
      res.json({ message: "Signup success! Please signin." });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  User.findOne({ email }).exec((error, user) => {
    if (error || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist. Please singup." });
    }
    //authentificate
    if (!user.authentificate(password)) {
      return res
        .status(400)
        .json({ error: "Email and password do not match." });
    }
    //generate a token and send it to the client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, userName, name, email, role } = user;
    return res.json({ token, user: { _id, userName, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});
