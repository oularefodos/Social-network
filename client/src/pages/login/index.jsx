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
    const changePageBtnName = isLoginPage ? ("I don't have a account, click to regiter") : ("Have you a account, click to Login ");

    return (
        <Box 
        sx={{
            width : {width},
            height : "auto",
            marginLeft : "auto",
            marginRight : "auto",
            marginTop : "5rem",
            padding : "2rem",
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
                {isLoginPage ? "LOGIN" : "SIGN UP"}
            </Typography>
            <Box>
                {
                    isLoginPage ? <LoginForm/> : <SignupForm/>
                }
                <Typography 
                    onClick={() => setIsLoginPage(!isLoginPage)}
                    textAlign = 'center'
                    sx={{
                        '&:hover': {
                            color : 'blue',
                            cursor : 'pointer'
                        }
                    }}
                >
                    {changePageBtnName}
                </Typography>
            </Box>
        </Box>
    )
}