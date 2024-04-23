import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CiCircleChevLeft } from "react-icons/ci";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";

function UserDeleteAccount() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem('id');

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await AxiosService.put(`/user/delete-account/${userId}`);
      const { message } = response.data;

      if (message) {
        toast.success(message);
        sessionStorage.clear()
        navigate('/')
      }
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response) {
        const errorMessage = error.response.data.message || "Failed to change password. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="cus-container light_set">
      <div className="form-box">
        <div className="back_to" onClick={handleGoBack}>
          <span className="goto"><CiCircleChevLeft className="go_back" />Go Back</span>
        </div>
        <div className="sign_in">
          <p className="signin">User Delete Account</p>
        </div>
        <div className="sign_in">
          <p className="sign_para">
            Are you sure you want to delete your account? This action cannot be undone. If you proceed, all your data associated with this account will be permanently deleted.
          </p>
        </div>
        <div className="body-form">
          <div className="button_div">
            <Button
              className="login_btn"
              color="primary"
              variant="contained"
              onClick={handleDeleteConfirmation}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Delete Account"}
            </Button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete your account?</p>
          
          <div className="confirmation-buttons">
            <Button variant="contained" color="primary" onClick={handleDeleteAccount} disabled={loading}>
              Yes
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowConfirmation(false)} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDeleteAccount;
