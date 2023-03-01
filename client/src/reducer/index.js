import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark",
    user: null,
    users: null,
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
        setUsers(state, action) {
            state.users = action.payload.users;
        },
        setFollowed(state, action) {
            if (state.user) {
                state.followed = action.payload.followed;
                const users = state.posts.map(user => {
                    if (user._id === action.payload.user._id) {
                        return action.payload.user;
                    }
                    return users;
                });
                state.users = users;
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

export const { setLogin, setFollowed, setLogout, setMode, setUsers, setPost, setPosts} = userSlice.actions;
export default userSlice.reducer;