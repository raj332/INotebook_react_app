const {
  toHaveErrorMessage,
} = require("@testing-library/jest-dom/dist/matchers");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt_secret='imking';
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');
// Route 1 :create user using post "/api/auth/createuser" Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "Password must be atleast 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors return
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
    // check whether user email is already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success=false;
      return res.status(400).json({ success,error: "Email already registered" });
    }
    const  salt = await bcrypt.genSalt(10);
   const  secPass= await bcrypt.hash(req.body.password,salt);

    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });  
    const data ={
        user:{
          id:user.id          
        }
    }
    success=true
     const authtoken = jwt.sign(data,jwt_secret);
    res.json({success,authtoken});
    
  }catch(error){
    success=false;
      console.error(error.message);
      res.status(500).send("Internal server error occured");
  }
})

// Route 2: authenticate user  "/api/auth/login" 
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {

    const {email,password}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success= false;
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user =await User.findOne({email});
        if(!user){
          return res.status(400).json({error :"wrong email or password !"}); 
        }
        const passwordCompare =await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          return res.status(400).json({error:"wrong email or password !"});

        }
        const data ={
          user:{
            id:user.id          
          }
      }
      const authtoken =jwt.sign(data ,jwt_secret);
      var success=true;
      res.json({success ,authtoken})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  })


//Route 3: get loggedin user detail using:  POST "/api/auth.getuser" login required
router.post( "/getuser",fetchuser,async (req, res) => {

try { 
  userid =req.user.id;
  const user =await User.findById(userid).select("-password");
 res.send(user);
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error occured");
}
  })
  module.exports = router;