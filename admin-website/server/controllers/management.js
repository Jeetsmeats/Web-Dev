/* IMPORT FILES */
import mongoose from "mongoose";
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import AffiliateStat from '../models/AffiliateStat.js';

export const getAdmins = async (req, res) => {        // GET admins controller function

    try {

        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);         // admin successfully found
    } catch (error) {

        res.status(404).json({message: error.message});     // admin not found
    }
}

export const getUserPerformance = async (req, res) => {     // GET performance stats

    try {

        const { id } = req.params;

        const userWithStats = await User.aggregate([        // match the id with id in the database
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {          // look up the affiliate stats in the user model
                    from: "affiliatestats",  // look up id in affiliate stats model
                    localField: "_id",      // get id from user
                    foreignField: "userId",     // compare _id from user model to userId from affiliate stats
                    as: "affiliateStats"
                },
            },
            { $unwind: "$affiliateStats" }   // flatten information
        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );

        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) { 

        res.status(404).json({message: error.message}); // performance stats not found
    }
}