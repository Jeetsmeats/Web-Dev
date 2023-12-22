import mongoose from 'mongoose';

// instantiate the post schema object
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// convert the post schema to a post model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;