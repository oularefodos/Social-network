import WrapComponent from "../../components/wrapComponent"
import { useTheme, Box, useMediaQuery, Typography, Button, Dialog, DialogContent } from '@mui/material'
import { UserProfileImage } from "../../components/userProfileImage";
import { useSelector, useDispatch } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { setFollowed } from "../../reducer";
import { useState } from "react";
import { Followers } from "./followers";
import { Following } from './followings'

export const UserInfo = ({ imagePath, name, followed, followers, userId, location, NumberPub }) => {

    const theme = useTheme();
    const ismobile = useMediaQuery("(max-width: 900px)");
    const [open, setOpen] = useState(false);
    const visitor = useSelector(state => state.user);
    const visitorId = visitor._id;
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const istAFollowed = visitor.following.includes(userId);
    const isMine = visitorId === userId;
    const handleClose = () => setOpen(false);
    const [followersOrFollowing, setfollowersOrFollowing] = useState('');
    
    const followAndUnfollow = async() => {
        try {
            const response = await fetch(`http://localhost:3001/user/${visitorId}/${userId}`, {
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
    const showFriends = (params) => {
        setOpen(true);
        setfollowersOrFollowing(params)
        console.log(followersOrFollowing);
    }
    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            <Box sx={{
                display: ismobile ? "block" : "flex",
                alignItems: "top",
                gap: ismobile ? "1rem" : "4rem",
            }}>
                <UserProfileImage size={"100px"} imagePath={imagePath}></UserProfileImage>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "monospace",
                            fontSize: "30px"
                        }}
                    >
                        {name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap="1rem" flexWrap="wrap">
                        <Typography
                            sx={{
                                fontFamily: "monospace",
                                fontSize: "20px"
                            }}
                            onClick = {() => showFriends('following')}
                        >{followed?.length} following </Typography>
                        <Typography
                            sx={{
                                fontFamily: "monospace",
                                fontSize: "18px"
                            }}
                            onClick = {() => showFriends('followers')}
                        >{followers?.length} followers </Typography>
                        <Typography
                            sx={{
                                fontFamily: "monospace",
                                fontSize: "18px"
                            }}
                        >{NumberPub} Publications </Typography>
                    </Box>
                    {
                        !isMine && (
                        <Button
                        type="submit"
                        sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            width : "60%",
                            backgroundColor: theme.palette.primary.main,
                            color : theme.palette.background.alt
                        }}
                        onClick = {followAndUnfollow}
                        >
                            {
                                istAFollowed ? ("Unfollow") : ("Follow")
                            }
                        </Button>
                        )
                    }
                    <Typography> <LocationOnIcon/> {location} </Typography>
                </Box>
            </Box>
            <Dialog
                open = {open}
                onClose={handleClose}
                sx= {{
                    width : "100%",
                    margin : "auto",
                    height : "auto"
                }}
            >

                <DialogContent
                    sx= {{
                        width : "100%"
                    }}
                >
                    {  
                        followersOrFollowing == "following" ? (
                        <Following 
                            userId={userId}
                        >
                        </Following>  )
                        : 
                        (
                            <Followers
                                userId={userId}
                            >
                            </Followers>
                        )
                    }   
                </DialogContent>
            </Dialog>
        </WrapComponent>
    )
}