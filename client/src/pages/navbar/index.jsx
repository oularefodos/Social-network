import { useState } from "react";
import { 
    Box,
    useTheme,
    IconButton,
    InputBase,
    Typography,
    MenuItem,
    FormControl,
    useMediaQuery
} from '@material-ui/core'

import { 
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexComponent from "../../components/flexComponent";

export const Navbar = () => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const user = useSelector((state)=> state?.user);
    const userFullname = `${user?.firstName} ${user?.lastName}`;

    return (
        <FlexComponent>
        </FlexComponent>
    );
}