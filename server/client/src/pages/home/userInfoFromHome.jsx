import { Box, useTheme, Typography, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { UserProfileImage } from '../../components/userProfileImage';
import {LocationOn } from "@mui/icons-material";
import WrapComponent from '../../components/wrapComponent';
import { useNavigate } from 'react-router-dom'
import { setUser } from "../../reducer"
import { useEffect } from 'react';

export const UserInfoFromHome = () => {
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const theme = useTheme();
    const dispatch = useDispatch();
    const Navigate = useNavigate()

    const getUser = async() => {
        try {
            const response = await fetch (`http://localhost:3001/user/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.ok) {
                const user = await response.json();
                dispatch(setUser({user : user}))
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
        <WrapComponent 
            backgroundColor={theme.palette.secondary.main}
        >
                <Box 
                    display='flex' 
                    alignItems='center' 
                    gap='2rem'
                    marginBottom='1rem'
                    flexWrap='wrap'
                >
                    <UserProfileImage size='60px' imagePath={user.picturePath} />
                    <Typography
                        sx={{
                            fontWeight : '400',
                            textTransform : 'uppercase'
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </Typography>
                </Box>
            <Divider/>
            <Box display='flex' gap='1rem' flexWrap='wrap'>
                <Box marginBottom='1rem' marginTop='1rem'>
                    <Typography>
                        {user.followers.length}
                    </Typography>
                    <Typography>
                        Followers
                    </Typography>
                </Box>
                <Box marginBottom='1rem' marginTop='1rem'>
                    <Typography>
                        {user.following.length}
                    </Typography>
                    <Typography>
                        Following
                    </Typography>
                </Box>
                <Box marginBottom='1rem' marginTop='1rem'>
                    <Typography>
                        <LocationOn/>
                    </Typography>
                    <Typography>
                        {user.location}
                    </Typography>
                </Box>
            </Box>
            <Divider/>
            <Box>

            </Box>
        </WrapComponent>
    )
}