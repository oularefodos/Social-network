import { useEffect, useState } from "react"
import { Box, useTheme } from "@mui/system";
import { useSelector } from "react-redux"
import { Friend } from "../../components/Freind";
import WrapComponent from "../../components/wrapComponent";

export const Followed = ({userId}) => {

    const [followeds, setFolloweds] = useState(null);
    const token = useSelector(state => state.token);
    const theme = useTheme();

    const getFollowing = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/following`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            const UserFollowers = await response.json();
            setFolloweds(UserFollowers);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFollowing();
    }, [])

    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            {
               followeds?.map( ({picturePath, firstName, lastName, _id}) => (
                    <Box key={_id}>
                        <Friend
                            profileImage={picturePath}
                            name={`${firstName} ${lastName}`}
                            friendId={_id}
                        >
                        </Friend>
                    </Box>
                    )
                )
            }
        </WrapComponent>
    )
}