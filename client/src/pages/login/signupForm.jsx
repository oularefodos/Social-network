import { Box } from "@mui/system"
import * as yup from 'yup';



const formSchema = yup.object().shape({
    firstName : yup.string().required("required"),
    lastName : yup.string().required("required"),
    email : yup.string().email("invalid").required("required"),
    password : yup.string().required("required"),
    picturePath : yup.string().required("required"),
    location : yup.string().required("required"),
})

const SignupForm = () => {
    return (
        <Box>
            login
        </Box>
    )
}

export default SignupForm;