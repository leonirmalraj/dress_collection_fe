import React, { useState } from "react";
import { CiMail, CiLock, CiRead, CiUnread } from "react-icons/ci";
import AxiosService from "../common/ApiService";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { CiCircleChevLeft } from "react-icons/ci";
import "../assets/css/login.css";
import "../assets/css/header.css";

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
  });

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  const handleSignin = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/user/signin", values);

      const { message, token, userData } = response.data;
      const user_id = response.data.userData._id;

      if (message) {
        toast.success(message);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem("id", user_id);

        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to sign in. Please try again.");
        }
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
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
            <p className="signin">Signin</p>
          </div>

          <div className="body-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSignin}
            >
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className="one_type">
                    <div className="one_div">
                      <CiMail className="font_set" />
                      <input
                        type="text"
                        name="email"
                        className="input_cloud"
                        placeholder="Email ID"
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

                  <div className="button_div">
                    <Button
                      className="login_btn"
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={loading || isSubmitting}
                    >
                      {loading || isSubmitting ? <CircularProgress size={24} /> : "Signin"}
                    </Button>
                  </div>

                  <div className="message d-flex justify-content-end">
                    <div className="forgot_pass">
                      <NavLink to="/forgot-password" className="register_para">
                        Forgot your password?
                      </NavLink>
                    </div>
                  </div>
                </form>
              )}
            </Formik>

            <div className="text-center mt-2">
              <div className="text-muted d-flex justify-content-end">
                <p className="register_set">
                  Don't have an account?&nbsp;
                  <NavLink to="/signup" className="register_para forgot_set">
                    Signup
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
