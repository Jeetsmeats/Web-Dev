import User from '../models/User';

/* READ */
// get user API
export const getUser = async (req, res) => {

    try {

        // get the user id
        const { id } = req.params;
        const user = await User.findById(id);   // find the user in the database

        // user successfully found
        res.status(200).json(user);
    } catch (err) { 
        
        // user not found
        res.status(404).json({ message: err.message });
    }
}

// get user API
export const getUserFriends = async (req, res) => {

    try {
        // get the user  id
        const { id } = req.params;
        const user = await User.findById(id);   // find the user in the database

        // get all the friends
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // format for client
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        // friends successfully found
        res.status(200).json(formattedFriends);
    } catch (err) { 

        // friends not found
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */

// update friends function
export const addRemoveFriend = async (req, res) => { 

    try {
        
        // get user and friend id and hence user and friend 
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // user has the friend on the friend list
        if (user.friends.includes(friendId)) {
            
            // remove this friend from the user and vice versa
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {    // friend does not exist on the list

            // add friend
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        
        // save the changes
        await user.save();
        await friend.save();

         // get all the friends
         const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // format for client
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        
        // formatted friends
        res.status(200).json(formattedFriends)
    } catch (err) { 

        // friends list not updated properly
        res.status(404).json({ message: err.message });
    }
}