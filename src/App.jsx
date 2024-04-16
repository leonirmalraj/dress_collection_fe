import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import AddColors from "./components/AddColors";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPasswordPage from "./components/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./common/ProtectedRoute";
import UserLogout from "./common/useLogout";

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
          <Route path="/addcolors" element={<AddColors />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/slick" element={<SlickCarousel />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
