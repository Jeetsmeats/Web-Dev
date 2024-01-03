/* IMPORT FILES */
import User from '../models/User.js';
import OverallStat from '../models/OverallStat.js';
import Transaction from '../models/Transaction.js';

export const getUser = async (req, res) => {        // GET /users controller function

    try {

        const { id } = req.params;      // get id from the router
        const user = await User.findById(id);      // find user by the request id

        res.status(200).json(user);         // user successfully found
    } catch (error) {

        res.status(404).json({message: error.message});
    }
}

export const getDashboardStats = async (req, res) => {  // GET dashboard information

    try {

        // hardcoded data
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        /* RECENT TRANSACTIONS */
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

        /* OVERALL STATS */
        const overallStat = await OverallStat.find({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            saleByCategory
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });

        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            saleByCategory,
            thisMonthStats,
            todayStats,
            transactions,
        });         // user successfully found
    } catch (error) {

        res.status(404).json({message: error.message});
    }
}