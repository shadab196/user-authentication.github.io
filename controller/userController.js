const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailValidator = require("email-validator");

/******************************************************
 * @SIGNUP
 * @route /api/auth/register
 * @method POST
 * @description singUp function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/


const signUp = async (req, res, next) => {
    const { name, email, password,username ,confirmPassword } = req.body;
  
    /// every field is required
    if (!name || !email || !password || !confirmPassword || !username) {
      return res.status(400).json({
        success: false,
        message: "Every field is required"
      });
    }
  
    //validate email using npm package "email-validator"
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address 📩"
      });
    }
  
    try {
      /// send password not match err if password !== confirmPassword
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "password and confirm Password does not match ❌"
        });
      }
  
      const userInfo = new userModel(req.body);
  
      // userSchema "pre" middleware functions for "save" will hash the password using bcrypt
      // before saving the data into the database
      const result = await userInfo.save();
      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      /// send the message of the email is not unique.
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: `Account already exist with the provided email ${username} 😒`
        });
      }
  
      return res.status(400).json({
        message: error.message
      });
    }
  };





  /******************************************************
 * @LogIN
 * @route /api/auth/signin
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/

const LogIn = async (req, res, next) => {
    const { username, password } = req.body;
  
    // send response with error message if email or password is missing
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required"
      });
    }
  
    try {
      // check user exist or not
      const user = await userModel
        .findOne({
          username
        })
        .select("+password");
  
      // If user is null or the password is incorrect return response with error message
      if (!user || !(await bcrypt.compare(password, user.password))) {
        // bcrypt.compare returns boolean value
        return res.status(400).json({
          success: true,
          message: "invalid credentials"
        });
      }
  
      // Create jwt token using userSchema method( jwtToken() )
      const token = user.jwtToken();
      user.password = undefined;
  
      const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000, //24hr
        httpOnly: true //  not able to modify  the cookie in client side
      };
  
      res.cookie("token", token, cookieOption);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };



  module.exports = {
    signUp,
    LogIn,
   
  };