import { 
    Box,
    useTheme,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { height } from '@mui/system';

export const Login = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const width = isLargeScreen ? "450px" : "80%" ;
    console.log(theme.palette.secondary.dark);
    return (
        <Box 
        sx={{
            width : {width},
            height : "700px",
            marginLeft : "auto",
            marginRight : "auto",
            marginTop : "5rem",
            border : "solid 1px grey",
            borderRadius: "10px 10px 10px 10px",
        }}
        backgroundColor = {theme.palette.secondary.main}
        >
            <Typography
                sx={{
                    fontFamily: "",
                    fontSize : "40px",
                    textAlign: "center",
                    marginTop : "2rem"
                }}
            > 
                SocialNetWork
            </Typography>
            <Box>
            </Box>
        </Box>
    )
}