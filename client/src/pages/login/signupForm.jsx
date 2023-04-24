import { Box, useTheme } from "@mui/system"
import { Formik } from "formik";
import { Button, TextField } from '@mui/material';
import { Create } from '@mui/icons-material';
import Dropzone from "react-dropzone";
import * as yup from 'yup';
import FlexComponent from "../../components/flexComponent";

const formSchema = yup.object().shape({
    firstName : yup.string().required("required"),
    lastName : yup.string().required("required"),
    email : yup.string().email("invalid").required("required"),
    password : yup.string().required("required"),
    picture : yup.string().required("required"),
    location : yup.string().required("required"),
});

const initialState = ({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    picture : "",
    location : ""
})

const SignupForm = ({setIsLoginPage, setMessage, setOpen}) => {

    const theme = useTheme();
    const handleFormSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method : 'POST',
                body : formData
            });
            if (response.ok)
            {
                setIsLoginPage(true);
            }
            else
            {
                const error = await response.json();
                if (error.keyValue.email)
                {
                    setMessage("email already used");
                    setOpen(true);
                }
            }
        }
        catch (error) {
            console.log(error)
        }
        onSubmitProps.resetForm();
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues = {initialState}
            validationSchema = {formSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                    sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        padding : '1rem',
                        gap : '1rem'
                    }}
                    >
                        <TextField 
                            label="First Name"
                            onBlur={handleBlur}
                            value={values.firstName}
                            onChange={handleChange}
                            name="firstName"
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />
                        <TextField 
                            label="Last Name"
                            onBlur={handleBlur}
                            value={values.lastName}
                            onChange={handleChange}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                        <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextField 
                            label="Password"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <TextField 
                            label="Location"
                            onBlur={handleBlur}
                            value={values.location}
                            onChange={handleChange}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                        />
                    <Box>
                        <Dropzone
                            acceptedFiles=".jpeg,.jpg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                            >
                           {({getRootProps, getInputProps}) => (
                               <Box
                               {...getRootProps()}
                               sx={{
                                   border : '1px dashed blue',
                                   margin : '1rem',
                                   padding : '1rem',
                                   height : '80px'
                                }}
                                >
                                    <input {...getInputProps()}/>
                                    {(!values.picture) ? (
                                        <p>Click here to add a picture</p>
                                        ) : (
                                            <FlexComponent>
                                            <p>{values.picture.name}</p>
                                            <Create/>
                                        </FlexComponent>
                                    )}
                                </Box>
                           )}
                        </Dropzone>
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            padding : '1rem',
                            backgroundColor: theme.palette.primary.main,
                            color : theme.palette.background.alt
                        }}
                        >
                        Submit
                    </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default SignupForm;