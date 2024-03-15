import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export const PageNotFound = () => {
    return (
        <Box>
            <Typography sx={{
                textAlign : "center",
                fontSize : '70px',
                marginTop : '100px'
            }}>
                404 Page Not Found : )
            </Typography>
        </Box>
    )
}