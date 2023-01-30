import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    friends: null,
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

export default userSlice.reducer;
export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts} = userSlice.actions;