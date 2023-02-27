import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    followers: null,
    followed :  null,
    posts: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMode(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout(state) {
            state.user = null;
            state.token = null;
        },
        setFollowers(state, action) {
            if (state.user) {
                state.followers = action.payload.followers;
            }
            else {
                console.log("User does not exist");
            }
        },
        setFollowed(state, action) {
            if (state.user) {
                state.followed = action.payload.followed;
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

export const { setFollowers, setLogin, setFollowed, setLogout, setMode, setPost, setPosts} = userSlice.actions;
export default userSlice.reducer;