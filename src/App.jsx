import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HeaderAddColor from "./components/HeaderAddColor";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import AddColors from "./components/AddColors";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPasswordPage from "./components/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./common/ProtectedRoute";
import UserDeatils from "./components/UserDeatils";
import UserProfile from "./components/UserProfile";
import UserChangePassword from "./components/UserChangePassword";
import UserDeleteAccount from "./components/UserDeleteAccount";


function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <>
                <ProtectedRoute>
                  <Header />
                  <Dashboard />
                </ProtectedRoute>
              </>
            }
          />
          <Route path="/addcolors" element={
            <>
              <ProtectedRoute>
                <HeaderAddColor />
                <AddColors/>
              </ProtectedRoute>
            </>
          }
          />
          <Route path="/user-details" element={
            <>
              <ProtectedRoute>
                <Header />
               <UserDeatils/>
              </ProtectedRoute>
            </>
          }
          />
          <Route path="/user-profile" element={
            <>
              <ProtectedRoute>
                <Header />
                <UserProfile />
              </ProtectedRoute>
            </>
          }
          />
          <Route path="/user-change-password" element={
            <>
              <ProtectedRoute>
                <Header />
                <UserChangePassword />
              </ProtectedRoute>
            </>
          }
          />
          <Route path="/user-delete-account" element={
            <>
              <ProtectedRoute>
                <Header />
                <UserDeleteAccount />
              </ProtectedRoute>
            </>
          }
          />
          
          <Route path="/profile" element={<UserProfile />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
