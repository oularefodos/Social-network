import { Box, InputBase, useTheme } from "@mui/material"
import {
    Send,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from '../reducer';
import { useState } from "react";


export const CommentForm = ({postId, commentIsOpen}) => {
    const theme = useTheme();
    const user = useSelector(state => state.user);
    const userId = user._id;
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const addComment = async() => {
        if (message === "") return ;
        try {
            const response = await fetch(`http://localhost:3001/posts/comment/${userId}/${postId}`, {
                method: 'PATCH',
                body : JSON.stringify({message : message}),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const newPost = await response.json();
            dispatch(setPost({post : newPost}));
            setMessage("");
        }
        catch (error) {
            console.log(error, "Error -- ERRor")
        }
    }

    return (
        <Box
            sx={{
                marginTop : '1rem',
                display : commentIsOpen ? 'flex' : 'none',
                alignItems : 'center',
                gap : '0.5rem'
            }}
        >
            <InputBase
                placeholder="Do you want to share something"
                sx={{
                    bgcolor : theme.palette.background.default,
                    width : '80%',
                    height : '35px',
                    padding : '1rem',
                    borderRadius : '2rem'
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            >
            </InputBase>
            <Send 
                sx = {{
                    color : theme.palette.primary.main,
                    '&:hover': {
                        color : 'blue',
                        cursor : 'pointer'
                    }
                }}
                onClick={addComment}
            />
        </Box>
    )
}