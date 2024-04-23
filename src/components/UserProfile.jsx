import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CiCircleChevLeft, CiUser, CiMail } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const userId = sessionStorage.getItem('id');

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await AxiosService.get(`/user/details/${userId}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error(error.response.data);
      // Handle error appropriately
    }
  };

  const handleUpdateProfile = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await AxiosService.put(`/user/details/${userId}`, values);
      const { message } = response.data;

      fetchUserData(); // Fetch user data again to update the UI after update
      if (message) {
        toast.success(message);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update. Please try again.");
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
          <span className="goto"><CiCircleChevLeft className="go_back" />Back</span>
        </div>
        <div className="sign_in">
          <p className="signin">User Profile</p>
        </div>
        <div className="body-form">
          <Formik
            enableReinitialize // Allow Formik to reinitialize when userData changes
            initialValues={{
              firstName: userData?.firstName || '',
              lastName: userData?.lastName || '',
              email: userData?.email || ''
            }}
            onSubmit={handleUpdateProfile}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => ( // Destructure handleChange from Formik render props
              <Form onSubmit={handleSubmit}>
                <div className="one_div">
                  <CiUser className="font_set" />
                  <Field
                    type="text"
                    name="firstName"
                    className="input_cloud"
                    placeholder="First Name"
                    value={values.firstName} // Use Formik's values object for binding
                    onChange={handleChange} // Call Formik's handleChange method
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
                    value={values.lastName}
                    onChange={handleChange}
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
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="error">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="required"
                  />
                </div>
                <Button
                  className="login_btn"
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? <CircularProgress size={24} /> : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
