/* IMPORT FILES */
import mongoose from 'mongoose';

/* TRANSACTION SCHEMA */
const TransactionSchema = new mongoose.Schema(
    {
        userId: String,
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number,
        }
    },
    { timestamps: true }  
);

const Transaction = mongoose.model("Transaction", TransactionSchema);        // create the model

export default Transaction;