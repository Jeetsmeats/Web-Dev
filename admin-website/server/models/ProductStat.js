/* IMPORT FILES */
import mongoose from 'mongoose';

/* PRODUCT SCHEMA */
const ProductStatSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
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
    }, 
    { timestamps: true }  
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);        // create the model

export default ProductStat;