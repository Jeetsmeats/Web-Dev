// import items
import { createSlice } from "@reduxjs/toolkit";

// global state accessible to the entire application
const initialState = {

    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {         // functions to change the state of the application
        setMode: (state) => {       /* light/dark mode toggle */

            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {      /* set the login information */

            state.user = action.payload.user;   // payload sends the user parameter
            state.token = action.payload.token; // payload sends the token parameter
        },
        setLogout: (state) => {     /* reset login information for logout */

            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {        /* set friends for the user */

            if (state.user) {   
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends are non existent -_-");
            }
        },
        setPosts: (state, action) => {      /* set all posts in app */

            state.posts = action.payload.posts;     
        },
        setPost: (state, action) => {       /* select post to return */
            
            const updatedPosts = state.posts.map((post) => {

                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;