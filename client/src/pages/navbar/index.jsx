import { useState } from "react";
import { 
    Box,
    useTheme,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material'

import { 
    DarkMode,
    LightMode,
    Logout,
    Home,
    Person,
    Menu,
    Close
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setMode, setLogout} from "../../reducer"
import FlexComponent from "../../components/flexComponent";

export const Navbar = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const user = useSelector((state)=> state?.user);
    const token = useSelector((state)=> state?.token);
    const theme = useTheme();
    const bckMobileMenu = theme.palette.secondary.light;
    const HandleIconClick = (path) =>  {
        navigate(path);
        setMenuIsOpen(!menuIsOpen);
    }

    if (!token && !user) return <Box></Box>
    return (
        <FlexComponent padding="1rem 6%" backgroundColor={theme.palette.primary.main}>
            <FlexComponent>
                <Typography
                    fontWeight="bold"
                    color="white"
                    fontSize="24px"
                >
                    Social-Network
                </Typography>
            </FlexComponent>
              {
                (isLargeScreen) ? (
                    <FlexComponent color="white" gap="2rem">
                        <IconButton onClick={() => navigate("/home")}>
                            <Home/>
                        </IconButton>
                        <IconButton onClick={() => navigate(`/profile/${user._id}`)}>
                            <Person/>
                        </IconButton>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? <LightMode/> : <DarkMode/>}
                        </IconButton> 
                        <IconButton  onClick={() => dispatch(setLogout())}>
                            <Logout/>
                        </IconButton>
                    </FlexComponent>
                ) :
                (
                    <FlexComponent color="white" gap="2rem">
                        <Menu onClick={() => setMenuIsOpen(!menuIsOpen)}/>
                    </FlexComponent>
                )
              }
              {
                !isLargeScreen && menuIsOpen && (
                    <Box
                        sx={{
                            position : "fixed",
                            right : "0",
                            bottom : "0",
                            height : "100%",
                            zIndex: "10",
                            minWidth : "100%",
                            maxWidth : "540px",
                        }}
                        backgroundColor = {bckMobileMenu}
                    >
                        <Box>
                            <IconButton>
                                <Close onClick={() => setMenuIsOpen(!menuIsOpen)}/>
                            </IconButton>
                        </Box>
                        <Box sx={{
                            display : "flex",
                            flexDirection : "column",
                            alignItems : "center",
                            spaceBetween : "center",
                            marginTop : "1rem",
                            gap : "2rem"
                        }}>
                            <IconButton onClick={() => HandleIconClick("/home")}>
                                <Home/>
                            </IconButton>
                            <IconButton onClick={() =>  navigate(`/profile/${user._id}`)} >
                                <Person/>
                            </IconButton>
                            <IconButton onClick={() => {
                                dispatch(setMode());
                                setMenuIsOpen(!menuIsOpen);
                            }}>
                                {theme.palette.mode === "dark" ? <LightMode/> : <DarkMode/>}
                            </IconButton> 
                            <IconButton>
                                <Logout onClick={() => dispatch(setLogout())}/>
                            </IconButton>
                        </Box>
                    </Box>
                )
              }
        </FlexComponent>
    );
}