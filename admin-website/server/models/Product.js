/* IMPORT FILES */
import mongoose from 'mongoose';

/* PRODUCT SCHEMA */
const ProductSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        supply: Number,
    },
    { timestamps: true }  
);

const Product = mongoose.model("Product", ProductSchema);        // create the model

export default Product;