/* IMPORT FILES */
import mongoose from 'mongoose';

/* OVERALL STAT SCHEMA */
const OverallStatSchema = new mongoose.Schema(
    {
        totalCustomers: Number,
        yearlySalesTotal: Number,
        yearlySalesTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number,
            }
        ],
        dailyData: [
            {
                date: String,
                totalSales: Number,
                totalUnits: Number,
            }
        ],
        salesByCategory: {
            type: Map,
            of: Number,
        },
    },
    { timestamps: true }  
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);        // create the model

export default OverallStat;