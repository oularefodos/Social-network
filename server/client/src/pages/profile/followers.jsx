import { useEffect, useState } from "react"
import { Box, useTheme } from "@mui/system";
import { useSelector } from "react-redux"
import { Friend } from "../../components/Freind";
import WrapComponent from "../../components/wrapComponent";


export const Followers = ({userId}) => {

    const [followers, setFollowers] = useState(null);
    const token = useSelector(state => state.token);
    const theme = useTheme();

    const getFollowers = async () => {
        console.log(userId)
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}/followers`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            const UserFollowers = await response.json();
            console.log(UserFollowers, "fode")
            setFollowers(UserFollowers);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFollowers();
    }, [])

    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            {
                followers?.map( ({picturePath, firstName, lastName, _id}) => (
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