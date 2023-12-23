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

/* LOGGING IN */
export const login = async (req, res) => { 

    try {

        // validate correct user
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });  // find the user corresponding to email

        if (!user) return res.status(400).json({ msg: "User does not exist. " }); 

        // validate correct password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(404).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;  

        // login was successful
        res.status(200).json({ token, user });
    } catch (err) { 

        // login information is not verified
        res.status(500).json({ error: err.message });
    }
}