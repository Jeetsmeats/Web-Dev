// import dependencies
import express from 'express';

// import controllers
import { getFeedPosts, getUserPosts, likePosts } from '../controllers/posts.js';

// token verification
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
// get all the feeds
router.get("/", verifyToken, getFeedPosts);

// get only the user posts
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
// for liking and unliking posts
router.patch("/:id/like", verifyToken, likePosts);

export default router;