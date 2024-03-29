import { 
    Box,
    useTheme,
    Typography,
    useMediaQuery,
    Alert,
} from '@mui/material'
import { useState } from 'react';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import { Snackbar } from '@material-ui/core';

export const Login = () => {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const width = isLargeScreen ? "450px" : "80%" ;
    const [isLoginPage, setIsLoginPage] = useState(true);
    const changePageBtnName = isLoginPage ? ("I don't have a account, click to regiter") : ("Have you a account, click to Login ");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

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
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity="error" >
                    {message}
                </Alert>
            </Snackbar>
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
                    isLoginPage ? <LoginForm setOpen={setOpen} setMessage={setMessage} /> : <SignupForm setIsLoginPage={setIsLoginPage} setOpen={setOpen} setMessage={setMessage} />
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