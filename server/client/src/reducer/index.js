import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark",
    user: null,
    users: null,
    followers : null,
    token: null,
    posts: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMode(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUser(state, action) {
            state.user = action.payload.user;
        },
        setLogin(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout(state) {
            state.user = null;
            state.users = null;
            state.token = null;
            state.posts = null;
        },
        setUsers(state, action) {
            state.users = action.payload.users;
        },
        setFollowed(state, action) {
            if (state.user) {
                state.user.following = action.payload.followed;
                const users = state.users.map(user => {
                    if (user._id === action.payload.user._id) {
                        return action.payload.user;
                    }
                    return user;
                });
                state.users = users;
            }
            else {
                console.log("User does not exist");
            }
        },
        setPosts(state, action) {
            state.posts = action.payload.posts.reverse();
        },
        setFollowers(state, action) {
            if (state.user) {
                state = action.payload.posts;
            }
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

export const { setLogin, setFollowed, setFollowers, setLogout, setMode, setUsers, setUser, setPost, setPosts} = userSlice.actions;
export default userSlice.reducer;