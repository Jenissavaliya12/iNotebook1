const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser')

const jwt = require("jsonwebtoken");
const JWT_SECRET = "Jenisisgoodboy";
//Route-1 create a user using : POST "/api/auth/createuser".no login  require

router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry!! user with this email is already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
      // .then(user => res.json(user)).catch((err) => {console.log(err)
      // res.json({error: 'Please enter unique email id.'})});
      res.json(user);
    } catch (error) {
      console.error(error.message);
    
    }
  }
);

// Route-2 create a user using : POST "/api/auth/login".no require login

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success,
            error: "Please try to login  with your correct credentials",
          });
      }

      const passwordComp = await bcrypt.compare(password, user.password);
      if (!passwordComp) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login  with your correct credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success =true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);


//Route-3 get user detail using : POST "/api/auth/getuser" login require

router.post('/getuser' , fetchuser ,async (req,res) => {
  try {
    userId =  req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})
module.exports = router;
