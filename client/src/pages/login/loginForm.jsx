import { Box, useTheme } from "@mui/system"
import { Formik } from "formik";
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';


const formSchema = yup.object().shape({
    email : yup.string().email("invalid").required("required"),
    password : yup.string().required("required"),
});

const initialState = ({
    email : "",
    password : ""
})

const LoginForm = () => {

    const theme = useTheme();
    const handleSubmit = () => {}
    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues = {initialState}
            validate = {formSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form>
                    <Box
                    sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        padding : '1rem',
                        gap : '1rem'
                    }}
                    >
                        <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                        />
                        <TextField 
                            label="Password"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                        />
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

export default LoginForm;