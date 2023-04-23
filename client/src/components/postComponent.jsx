import {
    Favorite,
    Comment,
} from "@mui/icons-material";
import { Box, 
    Typography, 
    useTheme,
    Divider, 
} from '@mui/material';
import FlexComponent from "./flexComponent";
import WrapComponent from "./wrapComponent";
import { useSelector, useDispatch  } from 'react-redux';
import { setPost } from '../reducer';
import { useState } from "react";
import { Friend } from "./Freind";
import { CommentForm } from "./commentForm";
import { Comments } from "./comments";
import { MyModal } from "./modalComponent";



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
    const [open, setOpen] = useState(false);
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
                                <Box marginTop = '1rem' fontFamily="monospace">
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
                        <Typography onClick={() => setOpen(true)}>{comments.length} comments</Typography>
                        <Typography>{likesCount} likes</Typography>
                    </Box>
                </FlexComponent>
            </Box>
            <Divider />
            <CommentForm postId={postId} commentIsOpen={commentIsOpen}></CommentForm>
            <MyModal open={open} setOpen={setOpen} title="comments">
                <Comments comments={comments}></Comments>
                <CommentForm postId={postId} commentIsOpen={true}></CommentForm>
            </MyModal>
        </WrapComponent>
    )
}