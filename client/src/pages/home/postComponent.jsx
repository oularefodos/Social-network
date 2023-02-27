import {
    FavoriteBorder,
    PersonAddAlt,
    Comment,
    HowToReg,
    HowToRegIcon
} from "@mui/icons-material";
import { Box, 
    Typography, 
    useMediaQuery,
    useTheme,
    Divider 
} from '@mui/material';
import FlexComponent from "../../components/flexComponent";
import WrapComponent from "../../components/wrapComponent";
import { UserProfileImage } from "../../components/userProfileImage";
import { useSelector, useDispatch  } from 'react-redux';
import { setFollowed } from '../../reducer'


export const PostComponent = ({
    postId,
    postUserId,
    userName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const theme = useTheme()
    const user = useSelector(state => state.user);
    const followed = useSelector(state => state.followed);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();

    const  followOrUnfollow = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/${user._id}/${postUserId}`, {
                method : 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.ok) {
                const newFollowing = await response.json();
                dispatch(setFollowed({followed : newFollowing}));
            }
            else {
                const error = await response.json();
                console.log(error);
            }
        }
        catch (error) {
    
        }
    }

    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            <FlexComponent>
                <Box display='flex' alignItems='center' gap='1rem' marginBottom='1rem'>
                    <UserProfileImage size='50px' imagePath={userPicturePath}></UserProfileImage>
                    <Typography>{userName}</Typography>
                </Box>
                {/* { !followed?.include(postUserId) ? <PersonAddAlt onClick={followOrUnfollow}/> : <HowToReg onClick={followOrUnfollow} /> } */}
            </FlexComponent>
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
            <Box marginTop='1rem'>
                <FlexComponent>
                    <Box display= 'flex'gap='0.5rem'>
                        <FavoriteBorder/>
                        <Comment/>
                    </Box>
                    <Box display= 'flex'gap='0.5rem'>
                        <Typography>{comments.length} comments</Typography>
                        <Typography>{comments.length} likes</Typography>
                    </Box>
                </FlexComponent>
            </Box>
        </WrapComponent>
    )
}