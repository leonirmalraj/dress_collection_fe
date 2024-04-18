import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CiUnlock, CiLock, CiCircleChevLeft } from "react-icons/ci";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#f50057",
        },
        error: {
            main: "#f44336",
        },
    },
});

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validationSchema = Yup.object({
        OTP: Yup.string().required("OTP Required"),
        password: Yup.string()
            .required("Password Required")
            .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
        confirmPassword: Yup.string()
            .required("Confirm Password Required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };
    const handleResetPassword = async (values) => {
        try {
            setLoading(true);

            if (values.password !== values.confirmPassword) {
                console.error("Passwords do not match");
                toast.error("Passwords do not match");
                return;
            }

            const response = await AxiosService.post("/user/reset-password", values);
            console.log(response.data);

            if (response.data.message) {
                toast.success(response.data.message);
            }

            navigate("/signin");
        } catch (error) {
            console.error(error.response.data);

            if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to reset password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cus-container light_set">
            <div className="form-box">
                <div className="back_to" onClick={handleGoBack}>
                    <span className="goto"><CiCircleChevLeft className="go_back" /></span>
                </div>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                            "& .MuiTextField-root": {
                                m: 1,
                                width: "25ch",
                                marginBottom: "20px",
                            },
                        }}
                    >
                        <div className="sign_in">
                            <p className="signin">Reset Password</p>
                        </div>

                        <div className="sign_in">
                            <p className="sign_para">
                                Enter the OTP and set a new password.
                            </p>
                        </div>
                        <Formik
                            initialValues={{
                                OTP: "",
                                password: "",
                                confirmPassword: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleResetPassword}
                        >
                            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <Form>
                                    <div className="one_type">
                                        <div className="one_div">
                                            <CiUnlock className="font_set" />
                                            <Field
                                                type="text"
                                                name="OTP"
                                                className="input_cloud"
                                                placeholder="Enter OTP"
                                            />
                                        </div>
                                        <div className="error">
                                            <ErrorMessage
                                                name="OTP"
                                                component="div"
                                                className="required"
                                            />
                                        </div>
                                    </div>

                                    <div className="one_type">
                                        <div className="one_div">
                                            <CiLock className="font_set" />
                                            <Field
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                className="input_cloud"
                                                placeholder="Password"
                                            />
                                            {showPassword ? (
                                                <VisibilityOff
                                                    className="pass_set"
                                                    onClick={handleTogglePassword}
                                                />
                                            ) : (
                                                <Visibility
                                                    className="pass_set"
                                                    onClick={handleTogglePassword}
                                                />
                                            )}
                                        </div>

                                        <div className="error">
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="required"
                                            />
                                        </div>
                                    </div>

                                    <div className="one_type">
                                        <div className="one_div">
                                            <CiLock className="font_set" />
                                            <Field
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                className="input_cloud"
                                                placeholder="Confirm Password"
                                            />
                                            {showConfirmPassword ? (
                                                <VisibilityOff
                                                    className="pass_set"
                                                    onClick={handleToggleConfirmPassword}
                                                />
                                            ) : (
                                                <Visibility
                                                    className="pass_set"
                                                    onClick={handleToggleConfirmPassword}
                                                />
                                            )}
                                        </div>

                                        <div className="error">
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="required"
                                            />
                                        </div>
                                    </div>

                                    <div className="button_div">
                                        <Button
                                            className="login_btn"
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            disabled={loading || isSubmitting}
                                        >
                                            {loading || isSubmitting ? <CircularProgress size={24} /> : "Reset Password"}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
