/* IMPORT ITEMS */
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// country code formatting
import { getCountryIso3 } from "country-iso-2-to-3";

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

export const getTransactions = async (req, res) => {    // /GET transaction (server-side concatenation)

    try {
        
        // sort should appear as this {" field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // formatted sort should look like this { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };

            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {};      // check if the sort exists

        /**
         * Search selected fields
        */
        const transactions = await Transaction.find({
            $or: [
                {
                    cost: { $regex: new RegExp(search, "i") }
                },
                {
                    userId: { $regex: new RegExp(search, "i") }
                }
            ]
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        /** 
         * Get the total count of transaction in the db 
        */
        const total = await Transaction.countDocuments({       
            name: { $regex: search, $options: "i" }
        });

        // transactions were successfully recovered
        res.status(200).json({
            transactions,
            total
        });
    } catch (error) {

        res.status(404).json({message: error.message});     // transactions were not found
    }
}

export const getGeography = async (req, res) => {         // /GET geography info

    try {
        
        const users = await User.find();        // get list of users
        
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);
            
            if (!acc[countryISO3]) {        // country is not formatted

                acc[countryISO3] = 0        // add country to accumulator
            }

            acc[countryISO3]++;             // accumulate country count
            return acc;
        }, {}); // format as choropleth charts - 3 letter country code

        const formattedLocations = Object.entries(mappedLocations).map(     // add count to the country
            ([country, count]) => {

                return { id: country, value: count }
            }
        )

        res.status(200).json(formattedLocations);
    } catch (error) {

        res.status(404).json({message: error.message});     // customers were not found
    }
}