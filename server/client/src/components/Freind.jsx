import FlexComponent from "./flexComponent"
import { setFollowed } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import {Box, Typography, IconButton} from '@mui/material';
import { UserProfileImage } from "./userProfileImage";
import { PersonAdd, PersonRemove } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

export const Friend = ({
    profileImage,
    name,
    friendId
}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const userId = user._id;
    const token = useSelector(state => state.token);
    const isFriend = user.following.includes(friendId);
    const navigate = useNavigate();
    

    const followAndUnfollow = async() => {
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/${friendId}`, {
                method : 'PATCH',
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setFollowed(data))
            }
            else
            {
                console.log(data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <FlexComponent marginTop = '1rem' marginBottom='1rem'>
            <Box display = 'flex' gap='1rem' alignItems='center'>
                <UserProfileImage size='50px' imagePath={profileImage}></UserProfileImage>
                <Typography onClick={() => navigate(`/profile/${friendId}`)} 
                    sx={{
                        "&:hover": {
                            color : "blue",
                            cursor : "pointer"
                        }
                    }}
                >
                    {name}
                </Typography>
            </Box>
            {
                (userId !== friendId) && (
                    <IconButton onClick={() => followAndUnfollow()}>
                        {
                            isFriend ? 
                            <PersonRemove sx={{
                                color : 'blue'
                            }}/>
                            :
                            <PersonAdd />
                        }
                    </IconButton>
                )
            }
        </FlexComponent>
    )
}