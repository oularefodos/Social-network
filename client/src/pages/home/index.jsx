import { useSelector } from 'react-redux';
import { Box,
         Container, 
         useMediaQuery 
        } from '@mui/material';
import { UserInfoFromHome } from './userInfoFromHome';
import { ShareComponent } from './ShareComponent';
import { PostsComponent } from './postsComponent';




export const Home = () => {
    const user = useSelector(state => state.user);
    const ismobile = useMediaQuery("(max-width: 900px)")
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
                <UserInfoFromHome> </UserInfoFromHome>
            </Box>
            <Box
                sx={{
                        width : ismobile ? '100%' : '60%',
                }}
            >
                <ShareComponent></ShareComponent>
                <PostsComponent></PostsComponent>
            </Box>
            <Box
               sx={{
                    width : ismobile ? '100%' : '30%',
               }} 
            >
                {/* <UserInfoFromHome> </UserInfoFromHome> */}
            </Box>
        </Container>
    )
}