import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CiCircleChevLeft, CiLock } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";

function UserChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem('id');


  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({   
    currentPassword: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
    newPassword: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
    confirmPassword: Yup.string()
      .required("Password Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
  });

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChangePassword = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await AxiosService.put(`/user/change-password/${userId}`, values);
      const { message } = response.data;

      if (message) {
        toast.success(message);
        sessionStorage.clear()
        navigate('/signin')
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Failed to change password. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <div className="cus-container light_set">
      <div className="form-box">
        <div className="back_to" onClick={handleGoBack}>
          <span className="goto"><CiCircleChevLeft className="go_back" />fgdgfdg</span>
        </div>
        <div className="sign_in">
          <p className="signin">Change Password</p>
        </div>
        <div className="body-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleChangePassword}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className="one_type">
                  <div className="one_div">
                    <CiLock className="font_set" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      className="input_cloud"
                      placeholder="Current Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      name="currentPassword"
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
                      name="newPassword"
                      className="input_cloud"
                      placeholder="New Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
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
                      name="newPassword"
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
                      name="confirmPassword"
                      className="input_cloud"
                      placeholder="Confirm New Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      
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
                    {loading || isSubmitting ? <CircularProgress size={24} /> : "Change Password"}
                  </Button>
                </div>
              </Form>
          
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UserChangePassword