import { useState } from "react";
import { 
    Box,
    useTheme,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material'

import { 
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Logout,
    Help,
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
    const userFullname = `${user?.firstName} ${user?.lastName}`;
    const theme = useTheme();
    const bckMobileMenu = theme.palette.secondary.light;

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
                        <Message/>
                        <Notifications/>
                        <Help/>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? <LightMode/> : <DarkMode/>}
                        </IconButton> 
                        <Logout onClick={() => dispatch(setLogout())}/>
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
                            minWidth : "240px",
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
                            <Message/>
                            <Notifications/>
                            <Help/>
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === "dark" ? <LightMode/> : <DarkMode/>}
                            </IconButton> 
                            <Logout/>
                        </Box>
                    </Box>
                )
              }
        </FlexComponent>
    );
}