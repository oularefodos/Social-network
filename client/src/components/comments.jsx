import { Box, Typography, useTheme } from "@mui/material"
import { UserProfileImage } from "./userProfileImage"

export const Comments = ({comments}) => {
    const theme = useTheme();
    return (
        <Box>
            {
              comments.map(({picturePath, firstName, lastName, message}, index) => (
                <Box margin="1rem" key={index}>
                    <Box display="flex" alignItems="start" gap="1rem">
                        <UserProfileImage size="50px" imagePath={picturePath}></UserProfileImage>
                        <Box backgroundColor={theme.palette.secondary.main} padding="1rem" borderRadius="20px">
                            <Typography textTransform="uppercase" fontWeight="bold"> {`${firstName} ${lastName}`} </Typography>
                            <Typography >
                                {message}
                            </Typography>
                        </Box>
                    </Box>
                    
                </Box>
              ))
            }
        </Box>
    )
}