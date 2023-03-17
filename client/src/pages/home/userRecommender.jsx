
import WrapComponent from "../../components/wrapComponent"
import { useSelector, useDispatch  } from 'react-redux';
import { useTheme, Box } from '@mui/material';
import { setUsers } from "../../reducer"
import { useEffect } from "react";
import { Friend } from "../../components/Freind";

export const PostRecommend = () => {
    const users = useSelector(state => state.users);
    const token = useSelector(state => state.token);
    const userId = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    const theme = useTheme();
    const userUnfollow = users?.filter(user => !user?.followers?.includes(userId) && user._id !== userId);

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
                        <Friend 
                        profileImage={user.picturePath}
                        name={`${user.firstName} ${user.lastName}`} 
                        friendId = {user._id}
                        ></Friend>
                    </Box>
                ))
            }
        </WrapComponent>
    )
}