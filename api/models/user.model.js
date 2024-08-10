import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  isSeller: {
    type: Boolean,
    default:false
  },
},{
  timestamps:true
});

userSchema.methods = {
  comparePassword: async function(plainTextPassword) {
      return await bcrypt.compare(plainTextPassword, this.password)
  },
  generateAccessToken: function(){
      return jwt.sign(
          {
              _id: this._id,
              email: this.email,
              username: this.username,
              fullName: this.fullName
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }
      )
  },
  generateRefreshToken: function(){
      return jwt.sign(
          {
              _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRY
          }
      )
  },
}
export default mongoose.model('User', UserSchema)