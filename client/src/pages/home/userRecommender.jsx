
import WrapComponent from "../../components/wrapComponent"
import { useSelector, useDispatch  } from 'react-redux';
import { PersonAdd, PersonRemove } from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { setUsers } from "../../reducer"
import { UserProfileImage } from "../../components/userProfileImage";
import FlexComponent from "../../components/flexComponent";
import { useEffect } from "react";


export const PostRecommend = () => {
    const users = useSelector(state => state.users);
    const token = useSelector(state => state.token);
    const userId = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    const theme = useTheme();
    const userUnfollow = users;

    const  getAllUser =  async() => {
        try {
            const response = await fetch('http://localhost:3001/user', {
                headers: { Authorization: `Bearer ${token}` }
             });
            const users = await response.json();
            dispatch(setUsers({users: users}));
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUser();
    }, [])

    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main} >
            {
                userUnfollow?.map(user => (
                    <Box key={user._id}>
                        <FlexComponent marginTop = '1rem' marginBottom='1rem'>
                            <Box display = 'flex' gap='1rem' alignItems='center'>
                                <UserProfileImage size='50px' imagePath={user.picturePath}></UserProfileImage>
                                <Typography>{user.firstName} {user.lastName}</Typography>
                            </Box>
                                 <IconButton>
                          <PersonAdd></PersonAdd>
                                </IconButton>
                        </FlexComponent>
                      <Divider/>
                    </Box>
                ))
            }
        </WrapComponent>
    )
}