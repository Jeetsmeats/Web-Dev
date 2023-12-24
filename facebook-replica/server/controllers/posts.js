// import dependencies
import Post from '../models/Post.js';

/* CREATE */
export const createPost = async (req, res) => {
    
    try {   
        
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        // create the post
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: {},
        });

        // save to mongodb
        await newPost.save()

        // get all the posts to update the frontend
        const post = await Post.find();

        // post was created successfully
        res.status(201).json(post);
    } catch (err) { 

        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getFeedPosts = async (req, res) => { 

    try {

        // get all the posts to update the frontend
        const post = await Post.find();

        // successful request
        res.status(200).json(post);
    } catch (err) { 

        // feed posts not found
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {

    try {

        const { userId } = req.params;
        // get only user feed posts update the frontend
        const post = await Post.find({ userId});

        // successful request
        res.status(200).json(post);
    } catch (err) { 

        // user posts not found
        res.status(404).json({ message: err.message });
    }
}


/* UPDATE */
export const likePosts = async (req, res) => {

    try {

        const { id } = req.params;
        const { userId } = req.body;
        
        const post = await Post.findById(id);       // grab post infor
        const isLiked = post.likes.get(userId);     // does user like it?

        if (isLiked) {
            
            post.likes.delete(userId);      // is liked, and is unliked
        } else {
            
            post.likes.set(userId, true);   // is not liked, and is therefore liked
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },      // update post likes
            { new: true }               // new object
        )

        // successful request
        res.status(200).json(updatedPost);
    } catch (err) { 

        //  posts not found
        res.status(404).json({ message: err.message });
    }
}