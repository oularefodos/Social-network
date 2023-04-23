import { Box,
    Container, 
    useMediaQuery 
   } from '@mui/material';
import { UserInfoFromHome } from '../home/userInfoFromHome';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { PageNotFound } from '../Error/404';
import { PostsComponent } from '../../components/postsComponent';
import { UserInfo } from './userInfo';
import { Followers } from './followers';


export const Profile = () => {

    const ismobile = useMediaQuery("(max-width: 900px)");
    const { userId } = useParams();
    const dispatch = useDispatch();
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
                console.log(user);
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
                    imagePath={profileOwner.picturePath}
                    name={`${profileOwner.firstName} ${profileOwner.lastName}`}
                    followed={profileOwner.following}
                    followers={profileOwner.followers}
                    userId={profileOwner._id}
                    location={profileOwner.location}
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
            <Followers userId={userId}></Followers>
        </Container>
    )
}