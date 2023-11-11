const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
      require: [true, 'user name is Required'],
      minLength: [5, 'Name must be at least 5 characters'],
      maxLength: [50, 'Name must be less than 50 characters'],
      trim: true,
  },
  email: {
    type: String,
      required: [true, 'user email is required'],
    
      lowercase: true,
      unique: [true, 'already registered'],
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password:{
      type: String,
      required:true,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  }
  // You can add more fields as needed
},
{ timestamps: true }
);


userSchema.methods = {
jwtToken() {
    return JWT.sign(
      { id: this._id, email: this.email },
      process.env.SECRET,
      { expiresIn: '24h' } // 24 hours
    );
  },
};



// Create the user model
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
