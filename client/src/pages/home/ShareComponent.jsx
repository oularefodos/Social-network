import { Box, useTheme, Typography, Button, InputBase, Divider} from '@mui/material';
import { useSelector, useDispatch  } from 'react-redux';
import { setPosts } from '../../reducer'
import FlexComponent from '../../components/flexComponent';
import { UserProfileImage } from '../../components/userProfileImage';
import { ImageOutlined, Mic, Tv, Create } from "@mui/icons-material";
import WrapComponent from '../../components/wrapComponent';
import { useState } from 'react';
import Dropzone from "react-dropzone";


export const ShareComponent = () => {
    const user = useSelector(state => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [imgInput, setImgImput] = useState(false);
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState('');

    const createPost = async() => {
        if (!picture && !description)
            return null;
        const form = new FormData();
        form.append('picture', picture);
        form.append('description', description);
        try {
            const response = await fetch ('http://localhost:3001/posts/create', {
                method : 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body : form,
            })
            if (response.ok) {
                const newPosts = await response.json();
                dispatch(setPosts({posts : newPosts}))
            }   
            else {
                const error = await response.json();
                console.log(error);
            }
            setDescription('');
            setImgImput(null);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <WrapComponent backgroundColor={theme.palette.secondary.main}>
            <Box display='flex' gap='1rem' alignItems='center' marginBottom='1rem'>
                <Box width='20%'>
                    <UserProfileImage imagePath={user.picturePath} size='70px'></UserProfileImage>
                </Box>
                <Box width='80%'>
                    <InputBase
                        placeholder="Do you want to share something"
                        sx={{
                            bgcolor : theme.palette.background.default,
                            width : '100%',
                            height : '50px',
                            padding : '1rem',
                            borderRadius : '2rem'
                        }}
                        value = {description}
                        onChange = {(e) => setDescription(e.target.value)}
                    />
                </Box> 
            </Box>
                <Divider/>
            <Box
                sx={{
                    display : imgInput? 'block' : 'none',
                    width : '100%'
                }}
            >
                <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png"
                    multiple={false}
                    onDrop = {(acceptedFiles => setPicture(acceptedFiles[0]))}
                >
                    {({getRootProps, getInputProps}) => (
                        <Box
                            sx={{
                                border : '1px dashed blue',
                                margin : '1rem',
                                padding : '1rem',
                                height : '80px'
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()}/>
                            {
                                (!picture) ? (
                                    <p>Click here to add a picture</p>
                                    ) : (
                                        <FlexComponent>
                                            <p>{picture.name}</p>
                                        <Create/>
                                    </FlexComponent>
                                    )
                            }
                        </Box>
                    )}
                </Dropzone>
            </Box>
            <Box display = 'flex' gap='1rem' marginTop='1rem' alignItems='center' width='100%'>
                <Box width='25%' onClick= {() => setImgImput(!imgInput)}>
                    <ImageOutlined />
                    <Typography>Photo</Typography>
                </Box>
                <Box width='25%'>
                    <Mic/>
                    <Typography>Audio</Typography>
                </Box>
                <Box width='25%'>
                    <Tv/>
                    <Typography>Video</Typography>
                </Box>
                <Box width='25%'>
                    <Button 
                        fullWidth
                        sx={{
                            padding : '0.5rem',
                            backgroundColor: theme.palette.primary.main,
                            color : theme.palette.background.alt
                        }}
                        onClick = {createPost}
                    >SHARE</Button>
                </Box>
            </Box>
        </WrapComponent>
    )
}