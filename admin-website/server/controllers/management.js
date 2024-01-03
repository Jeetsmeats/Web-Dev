/* IMPORT FILES */
import mongoose from "mongoose";
import User from '../models/User.js';

export const getAdmins = async (req, res) => {        // GET asmins controller function

    try {

        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);         // admin successfully found
    } catch (error) {

        res.status(404).json({message: error.message});     // admin not found
    }
}