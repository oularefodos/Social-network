import { 
    Box,
    useTheme,
    Typography,
    useMediaQuery,
    Button,
} from '@mui/material'
import { useState } from 'react';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

export const Login = () => {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const width = isLargeScreen ? "450px" : "80%" ;
    const [isLoginPage, setIsLoginPage] = useState(false);
    const changePageBtnName = isLoginPage ? ("Sign UP") : ("Login");

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
                {
                    isLoginPage ? <LoginForm/> : <SignupForm/>
                }
                <Button onClick={() => setIsLoginPage(!isLoginPage)}>{changePageBtnName}</Button>
            </Box>
        </Box>
    )
}