import WrapComponent from "../../components/wrapComponent"
import { useTheme, Box, useMediaQuery, Typography, Button} from '@mui/material'
import { UserProfileImage } from "../../components/userProfileImage";
import { useSelector, useDispatch } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { setFollowed } from "../../reducer";
import { useState, useEffect } from "react";
import { Followers } from "./followers";
import { Followed } from './followings'
import { MyModal } from "../../components/modalComponent";

export const UserInfo = ({ userId, NumberPub }) => {

    const theme = useTheme();
    const ismobile = useMediaQuery("(max-width: 900px)");
    const [open, setOpen] = useState(false);
    const visitor = useSelector(state => state.user);
    const visitorId = visitor._id;
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const istAFollowed = visitor.following.includes(userId);
    const isMine = visitorId === userId;
    const [followersOrFollowing, setfollowersOrFollowing] = useState('');
    const [user, setUser] = useState(null);
    const allFollowers = isMine ? visitor.followers : user?.followers;
    const allFollowing = isMine ? visitor.following : user?.following;
    
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
    
    const getUser = async() => {
        try {
            const response = await fetch (`http://localhost:3001/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.ok) {
                const Newuser = await response.json();
                setUser(Newuser);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    })

    
    const showFriends = (params) => {
        setOpen(true);
        setfollowersOrFollowing(params)
    }
    
    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            <Box sx={{
                display: ismobile ? "block" : "flex",
                alignItems: "top",
                gap: ismobile ? "1rem" : "4rem",
            }}>
                <UserProfileImage size={"100px"} imagePath={user?.picturePath}></UserProfileImage>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "monospace",
                            fontSize: "30px",
                            textTransform : "uppercase"
                        }}
                    >
                        {`${user?.firstName} ${user?.lastName}`}
                    </Typography>
                    <Box display="flex" alignItems="center" gap="1rem" flexWrap="wrap">
                        <Typography
                            sx={{
                                fontFamily: "monospace",
                                fontSize: "20px",
                                "&:hover": {
                                    color : "blue",
                                    cursor : "pointer"
                                },
                                
                            }}
                            onClick = {() => showFriends('following')}
                        >{allFollowing?.length} followeds </Typography>
                        <Typography
                            sx={{
                                fontFamily: "monospace",
                                fontSize: "18px",
                                "&:hover": {
                                    color : "blue",
                                    cursor : "pointer"
                                },
                            }}
                            onClick = {() => showFriends('followers')}
                        >{allFollowers?.length} followers </Typography>
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
                    <Typography> <LocationOnIcon/> {user?.location} </Typography>
                </Box>
            </Box>
            <MyModal open={open} setOpen={setOpen} title={followersOrFollowing}>
                { 
                followersOrFollowing === "following" ? (
                    <Followed 
                        userId={userId}
                    >
                    </Followed>  )
                    : 
                    (
                        <Followers
                            userId={userId}
                        >
                        </Followers>
                    )
                }
            </MyModal>
        </WrapComponent>
    )
}