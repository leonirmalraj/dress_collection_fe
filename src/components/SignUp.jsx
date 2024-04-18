import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import "../assets/css/login.css";
import "../assets/css/header.css";
import { CiCircleChevLeft } from "react-icons/ci";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
  });

  const handleSignup = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/user/signup", values);
      const { message } = response.data;
      toast.success(message);
      navigate("/signin");
    } catch (error) {
      console.error(error.response.data);
      const errorMessage =
        error.response.data.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <>
      <div className="cus-container light_set">
        <div className="form-box">
          <div className="back_to" onClick={handleGoBack}>
            <span className="goto"><CiCircleChevLeft className="go_back" /></span>
          </div>
          <div className="sign_in">
            <p className="signin">SignUp</p>
          </div>

          <div className="body-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <Form>
                  <div className="one_div">
                    <CiUser className="font_set" />
                    <Field
                      type="text"
                      name="firstName"
                      className="input_cloud"
                      placeholder="First Name"                      
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                  </div>
                  <div className="error">
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="required"
                    />
                  </div>

                  <div className="one_div">
                    <CiUser className="font_set" />
                    <Field
                      type="text"
                      name="lastName"
                      className="input_cloud"
                      placeholder="Last Name"                      
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                  </div>
                  <div className="error">
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="required"
                    />
                  </div>

                  <div className="one_div">
                    <CiMail className="font_set" />
                    <Field
                      type="text"
                      name="email"
                      className="input_cloud"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <div className="error">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="required"
                    />
                  </div>

                  <div className="one_type">
                    <div className="one_div">
                      <CiLock className="font_set" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="input_cloud"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
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

                  <Button
                    className="login_btn"
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Sign Up"}
                  </Button>                 
                  <div className="message_set">
                    <div className="forgot_pass">
                      Already have an account? &nbsp;
                      <NavLink to="/signin" className="register_para">
                        Signin
                      </NavLink>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
