/* IMPORT FILES */
import User from '../models/User.js';

export const getUser = async (req, res) => {        // GET /users controller function

    try {

        const { id } = req.params;      // get id from the router
        const user = await User.findById(id);      // find user by the request id

        res.status(200).json(user);         // user successfully found
    } catch (error) {

        res.status(404).json({message: error.message});
    }
}