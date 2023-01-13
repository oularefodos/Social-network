import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "ligth",
    user: null,
    token: null,
    friends: null,
    posts: null,
};

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMode(state) {
            state.mode = state.mode === "ligth" ? "dark" : "ligth";
        },
        setLogin(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout(state) {
            state.user = null;
            state.token = null;
        },
        setFriends(state, action) {
            if (state.user) {
                state.friends = action.payload.friends;
            }
            else {
                console.log("User does not exist");
            }
        },
        setPosts(state, action) {
            state.posts = action.payload.posts;
        },
        setPost(state, action) {
            const posts = state.posts.map(post => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            })
            state.posts = posts;
        }
    }
})

export default  userReducer.reducers;