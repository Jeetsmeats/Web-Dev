import PostMessage from '../models/postMessage.js';

// get posts middleware that corresponds to get router
export const getPosts = async (req, res) => {
    
    try {
        
        // asynchronously get all posts
        const postMessages = await PostMessage.find();
        
        console.log(postMessages);
        
        // posts were successfully retrieved
        res.status(200).json(postMessages);
    } catch (err) { 

        // posts could not be found
        res.status(404).json({ message: err.message });
    }
}

// create posts middle that corresponds to the post router
export const createPosts = (req, res) => { 
    res.send('Post creation');
}