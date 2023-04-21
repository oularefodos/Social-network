
import { Box } from '@mui/material';
import { useSelector, useDispatch  } from 'react-redux';
import { setPosts } from '../reducer'
import { useEffect} from "react";
import { PostComponent } from "./postComponent";

export const PostsComponent = ({posts}) => {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const getPosts = async() => {
        try {
            const response = await fetch('http://localhost:3001/posts', {
               headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const allPosts = await response.json();
                dispatch(setPosts({posts : allPosts}));
            }
            else {
                const error = await response.json();
                console.log(error)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getPosts();
    }, [])

    return (
       <Box>
            {
                posts?.map((
                    {
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    } 
                ) => (
                   <PostComponent
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    userName={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                   />
                )
            )}
       </Box>
    )
    
}