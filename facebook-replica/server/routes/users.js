// import dependencies
import express from 'express';

// import end controller api
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js';

// import token verification middleware
import { verifyToken } from '../middleware/auth.js';

// set up express app router
const router = express.Router();

/* READ */
// get user 
router.get("/:id", verifyToken, getUser);

// get user friends
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// make changes to user friends
router.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default router;