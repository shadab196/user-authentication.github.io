const express = require("express");
const authRouter = express.Router();
const jwtAuth = require("../middleware/userMiddleware.js");

const {
  signUp,
  LogIn,

  
} = require("../controller/userController.js");

authRouter.post("/signup", signUp);
authRouter.post("/login", LogIn);

authRouter.get("/user", jwtAuth);


module.exports = authRouter;
