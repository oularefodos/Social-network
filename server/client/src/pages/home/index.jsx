import { Box,
         Container, 
         useMediaQuery 
        } from '@mui/material';
import { UserInfoFromHome } from './userInfoFromHome';
import { ShareComponent } from './ShareComponent';
import { PostsComponent } from '../../components/postsComponent';
import { PostRecommend } from './userRecommender';
import { useSelector } from 'react-redux';

export const Home = () => {

    const ismobile = useMediaQuery("(max-width: 900px)")
    const posts = useSelector(state => state.posts);
    return (
        <Container 
        maxWidth='lg' 
        sx={{
            marginTop : '4rem',
            display : ismobile ? 'block' : 'flex',
            gap : '2rem',
            alignItems : 'start'
        }}
        >
            <Box 
                sx={{
                    width : ismobile ? '100%' : '30%',
                }}
            >
                <UserInfoFromHome > </UserInfoFromHome>
            </Box>
            <Box
                sx={{
                        width : ismobile ? '100%' : '60%',
                }}
            >
                <ShareComponent></ShareComponent>
                <PostsComponent posts={posts}></PostsComponent>
            </Box>
            <Box
               sx={{
                    width : ismobile ? '100%' : '30%',
               }} 
            >
                <PostRecommend></PostRecommend>
            </Box>
        </Container>
    )
}