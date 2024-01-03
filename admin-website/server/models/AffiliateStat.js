/* IMPORT FILES */
import mongoose from 'mongoose';

/* AFFILIATE STAT SCHEMA */
const AffiliateStatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User"},
        affiliateSales: {
            type: [mongoose.Types.ObjectId],
            ref: "Transaction",
        }
    },
    { timestamps: true }  
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);        // create the model

export default AffiliateStat;