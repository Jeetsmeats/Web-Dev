/* IMPORT ITEMS */
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {        // /GET /products controller

    try {
        
        const products = await Product.find();      // get all the products

        const productsWithStats = await Promise.all(        // get the product stats
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id          // get the stat for a given product
                });
                return {
                    ...product._doc,
                    stat,
                }
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {

        res.status(404).json({message: error.message});     // products were not found
    }
}

export const getCustomers = async (req, res) => {       // /GET all /customers 

    try {
        
        const customers = await User.find({ role: "user" }).select("-password"); // get all the customers - ignore the password
        res.status(200).json(customers);
    } catch (error) {

        res.status(404).json({message: error.message});     // customers were not found
    }
}