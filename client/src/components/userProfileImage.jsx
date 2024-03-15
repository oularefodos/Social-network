import { Box } from "@mui/material";

export const UserProfileImage = ({size, imagePath}) => {

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
                    width : size,
                    overflow: "hidden",
                }}
                alt={imagePath}
                src = {imagePath}
            >

            </img>
        </Box>
    )
}
