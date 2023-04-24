import { Box, useTheme } from "@mui/system"
import { Formik } from "formik";
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {setLogin} from "../../reducer"

const formSchema = yup.object().shape({
    email : yup.string().email("invalid").required("required"),
    password : yup.string().required("required"),
});

const initialState = ({
    email : "",
    password : ""
});

const LoginForm = ({setOpen, setMessage}) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFormSubmit = async(values, onSubmitProps) => {
        const {email, password} = values;

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method : 'POST',
                body : JSON.stringify({email, password}),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                const user = await response.json();
                dispatch(setLogin(user));
                navigate('/home');
            }
            else {
                const error = await response.json();
                setMessage(error.message);
                setOpen(true);
            }
        }
        catch (error) {
            console.log(error);
        }
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