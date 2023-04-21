import { useEffect, useState } from "react"
import { Box, useTheme } from "@mui/system";
import { useSelector } from "react-redux"
import { Friend } from "../../components/Freind";
import WrapComponent from "../../components/wrapComponent";
import { Margin } from "@mui/icons-material";


export const Following = ({userId}) => {

    const [following, setFollowing] = useState(null);
    const token = useSelector(state => state.token);
    const theme = useTheme();

    const getFollowing = async () => {
        console.log(userId)
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/following`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            const UserFollowers = await response.json();
            console.log(UserFollowers, "fode")
            setFollowing(UserFollowers);
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
                following?.map( ({picturePath, firstName, lastName, _id}) => (
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