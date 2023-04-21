import {
    Favorite,
    Send,
    Comment,
} from "@mui/icons-material";
import { Box, 
    Typography, 
    useTheme,
    Divider, 
    InputBase,
} from '@mui/material';
import FlexComponent from "./flexComponent";
import WrapComponent from "./wrapComponent";
import { useSelector, useDispatch  } from 'react-redux';
import { setPost } from '../reducer';
import { useState } from "react";
import { Friend } from "./Freind";



export const PostComponent = ({
    postId,
    postUserId,
    userName,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const theme = useTheme()
    const user = useSelector(state =>  state.user);
    const userId = user._id;
    const isLiked = Boolean(likes[userId])
    const likesCount = Object.keys(likes).length;
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const [commentIsOpen, setCommentIsOpen] = useState(false);
    
    const likeOrDislik = async() => {
        try {
            const response = await fetch(`http://localhost:3001/posts/like/${userId}/${postId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const newPost = await response.json();
            dispatch(setPost({post : newPost}));

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            <Friend 
                profileImage={userPicturePath}
                name={userName}
                friendId={postUserId}
            >
            </Friend>
            <Divider/>
            {
                description && (
                    <Box marginTop = '1rem'>
                        <Typography>
                            {description}
                        </Typography>
                    </Box>
                )
            }
            {
                picturePath && (
                    <Box width='100%' marginTop='1rem' marginBottom='1rem'>
                        <img src={picturePath} width='100%' height='auto' ></img>
                    </Box>
                )
            }
            <Divider />
            <Box marginTop='1rem' marginBottom='1rem'>
                <FlexComponent>
                    <Box display= 'flex'gap='0.5rem'>
                        { !isLiked ? 
                            <Favorite onClick={likeOrDislik} />
                            :
                            <Favorite onClick={likeOrDislik} sx={{color : 'red'}} />
                        }
                        <Comment onClick={() => setCommentIsOpen(!commentIsOpen)}/>
                    </Box>
                    <Box display= 'flex'gap='0.5rem'>
                        <Typography>{comments.length} comments</Typography>
                        <Typography>{likesCount} likes</Typography>
                    </Box>
                </FlexComponent>
            </Box>
            <Divider />
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
                />
            </Box>
        </WrapComponent>
    )
}