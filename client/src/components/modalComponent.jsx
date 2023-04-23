import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent, Divider, IconButton, Typography, useMediaQuery, } from "@mui/material"

export const MyModal = ({open, setOpen, children, title}) => {

    const handleClose = () => setOpen(false);
    const isLargeScreen = useMediaQuery("(min-width: 900px)");

   return (
        <Dialog
        open = {open}
        onClose={handleClose}
        sx= {{
            margin : "auto",
            height : "auto",
        }}
        >
        <DialogContent
            style={{width: isLargeScreen ? '600px' : "80%"}}
            >
            <Box sx={{
                display : "flex",
                justifyContent : "space-between",
            }}>
            <Typography
                sx={{
                    margin : "1rem",
                    textTransform : "uppercase",
                    fontSize : "25px",
                    fontFamily : "fantasy"
                }}
            >{title}</Typography>
             <IconButton
                onClick={handleClose}
            ><Close></Close></IconButton>
            </Box>
            <Divider></Divider>
            <Box width='100%' marginTop="1rem">
                { children }
            </Box>   
        </DialogContent>
    </Dialog>
   )
}