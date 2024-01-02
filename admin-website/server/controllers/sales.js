/* IMPORT FILES */
import OverallStat from "../models/OverallStat";

export const getSales = async (req, res) => {   // get sales api endpoint

    try {

        const overallStats = await OverallStat.find();  // overall all stats get func

        res.status(200).json(overallStats[0]);  // return first version of sales
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}