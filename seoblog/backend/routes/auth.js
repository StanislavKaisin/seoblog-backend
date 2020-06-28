const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

//validation
const { runValidation } = require("../validators");
const { userSingupVaidator } = require("../validators/auth");

router.post("/signup", userSingupVaidator, runValidation, signup);
// router.post("/signin", userSinginVaidator, runValidation, signin);
router.post("/signin", runValidation, signin);
router.get("/signout", signout);
//test
router.get("/secret", requireSignin, (req, res) => {
  res.json({ message: "You have access to secret page" });
});

module.exports = router;
