import { Box, useTheme, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import FlexComponent from '../../components/flexComponent';
import { UserProfileImage } from '../../components/userProfileImage';
import { ManageAccounts, LocationOn } from "@mui/icons-material";
import WrapComponent from '../../components/wrapComponent';
import { useNavigate } from 'react-router-dom'

export const UserInfoFromHome = () => {
    const user = useSelector(state => state.user);
    const theme = useTheme();
    const Navigate = useNavigate()
    return (
        <WrapComponent 
            backgroundColor={theme.palette.secondary.main}
        >
                <Box 
                    display='flex' 
                    alignItems='center' 
                    gap='2rem' 
                    marginBottom='1rem'
                    flexWrap='wrap'
                >
                    <UserProfileImage size='60px' imagePath={user.picturePath} />
                    <Typography
                        sx={{
                            fontWeight : '400',
                            textTransform : 'uppercase'
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </Typography>
                </Box>
            <Divider/>
            <Box display='flex' gap='1rem' flexWrap='wrap'>
                <Box marginBottom='1rem' marginTop='1rem'>
                    <Typography>
                        {user.followers.length}
                    </Typography>
                    <Typography>
                        Followers
                    </Typography>
                </Box>
                <Box marginBottom='1rem' marginTop='1rem'>
                    <Typography>
                        {user.followers.length}
                    </Typography>
                    <Typography>
                        Following
                    </Typography>
                </Box>
                <Box marginBottom='1rem' marginTop='1rem'>
                    <Typography>
                        <LocationOn/>
                    </Typography>
                    <Typography>
                        {user.location}
                    </Typography>
                </Box>
            </Box>
            <Divider/>
            <Box>

            </Box>
        </WrapComponent>
    )
}