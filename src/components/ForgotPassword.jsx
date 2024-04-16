import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../assets/css/header.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../assets/css/login.css";

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

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
  });

  const handleForgotPassword = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/user/forgot-password", values);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send password reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cus-container light_set">
        <div className="form-box">
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
                <p className="signin">Forgot Password</p>
              </div>

              <div className="sign_in">
                <p className="sign_para">
                  Enter your email address to receive a password reset link.
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleForgotPassword}
              >
                {(formik) => (
                  <Form>
                    <div className="one_type">
                      <div className="one_div">
                        <CiMail className="font_set" />
                        <input
                          type="text"
                          name="email"
                          className="input_cloud"
                          placeholder="Email ID"
                        />
                      </div>
                      <div className="error">
                        <ErrorMessage
                          name="email"
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
                      disabled={loading || !formik.isValid}
                    >
                      {loading ? <CircularProgress size={24} /> : "Reset Password"}
                      </Button>
                      </div>
                  </Form>
                )}
              </Formik>

              <div className="message">
                <div className="forgot_pass">
                  Remember your password? &nbsp;
                  <NavLink to="/signin" className="register_para">
                    Sign in
                  </NavLink>
                </div>
              </div>

              <div className="message_set">
                <div className="forgot_pass">
                  Don't have an account? &nbsp;
                  <NavLink to="/signup" className="register_para">
                    SignUp
                  </NavLink>
                </div>
              </div>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
