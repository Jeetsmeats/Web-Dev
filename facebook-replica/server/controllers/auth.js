// install dependencies
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/Users.js"

/* REGISTER USER */
export const register = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        // create random salt from bcrypt
        const salt = await bcrypt.getSalt();
        // create a password hash key from salt
        const passwordHash = await bcrypt.hash(password, salt);

        // create new user based on password hash
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
    
        // save the user information
        const savedUser = await newUser.save();
        
        // the user has been successfully created
        res.status(201).json(savedUser);
    } catch (err) {

        // user information was not successfully saved
        res.status(500).json({ error: err.message });
    }
}