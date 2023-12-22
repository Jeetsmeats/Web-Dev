import PostMessage from '../models/postMessage.js';

// get posts middleware that corresponds to get router
export const getPosts = async (req, res) => {
    
    try {
        
        // asynchronously get all posts
        const postMessages = await PostMessage.find();
        
        console.log(postMessages);
        
        // posts were successfully retrieved
        res.status(200).json(postMessages);
    } catch (error) { 

        // posts could not be found
        res.status(404).json({ message: error.message });
    }
}

// create posts middle that corresponds to the post router
export const createPosts = async (req, res) => { 
    
    // get input request from post router
    const post = req.body;

    // convert post input into the PostMessage model
    const newPost = new PostMessage(post);
    try {

        // save the post to mongodb
        await newPost.save();

        // post was successfully created
        res.status(201).json(newPost);
    } catch (error) {

        // conflict with save ie incorrect post input or
        // input does not match schema
        res.status(409).json({ message: error.message });
    }
}