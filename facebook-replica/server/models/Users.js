// install dependencies
import mongoose from "mongoose";

// set up user schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

// create user model from user schema
const User = mongoose.model('User', UserSchema);
export default User;