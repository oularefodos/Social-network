import { Box } from "@mui/material";

export const UserProfileImage = ({size, imagePath}) => {
    console.log(typeof(size))
    return (
        <Box
            style={{
                height : size,
                width : size,
            }}
        >
            <img
                style={{
                    borderRadius : '50%',
                    height : size,
                    width : size
                }}
                src = {imagePath}
            >

            </img>
        </Box>
    )
}
