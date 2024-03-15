import { Box,
    Container, 
    useMediaQuery 
   } from '@mui/material';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PostsComponent } from '../../components/postsComponent';
import { UserInfo } from './userInfo';


export const Profile = () => {

    const ismobile = useMediaQuery("(max-width: 900px)");
    const { userId } = useParams();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);
    const [profileOwner, setProfileOwner] = useState(null);
    const profileOwnerPost = posts.filter(post => post.userId === userId)

    const getUser = async() => {
        try {
            const response = await fetch (`http://localhost:3001/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.ok) {
                const user = await response.json();
                setProfileOwner(user);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <Container 
        maxWidth='lg' 
            sx={{
                marginLeft : "auto",
                marginRight : "auto",
                marginTop : "2rem"
            }}
        >
            <Box 
                sx={{
                    width : ismobile ? "100%" : "90%",
                    marginLeft : "auto",
                    marginRight : "auto"
                }}
            >
                {
                profileOwner && (
                <UserInfo 
                    userId={userId}
                    NumberPub={profileOwnerPost.length}
                >
                </UserInfo>)
                }
            </Box>
            <Box
                sx={{
                        width : ismobile ? '100%' : '60%',
                        marginLeft : "auto",
                        marginRight : "auto"
                }}
            >
                <PostsComponent posts={profileOwnerPost} />
            </Box>
        </Container>
    )
}