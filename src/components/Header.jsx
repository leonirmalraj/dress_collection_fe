import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import "../assets/css/header.css"; // Import CSS for styling
import { CiHome, CiUser, CiLogout, CiSun, CiUnlock, CiTrash } from "react-icons/ci";
import useLogout from "../common/useLogout";

const Navbar = () => {
  const logout = useLogout();

  return (
    <nav className="navbar_show">
      <div className="content_container">
        <div className="nav_list">
          <div className="navbar-container">
            <ul className="navbar-links">
              <li>
                <NavLink to="/" className="opened">
                  <CiHome className="dash_icon" />
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav_showing">
            <ul className="navbar-links">
              <li>
                <div className="goto_color">
                  <NavLink to="/addcolors" className="opened">
                    <span className="goto_colors">Add Colors</span>
                  </NavLink>
                </div>
              </li>

              <li>
                <div className="log_icon">
                  <NavLink to="/user-details" className="opened">
                    <CiSun className="logout_icon " />
                    
                  </NavLink>
                  <div className="sub_nav">
                    <ul className="sub_nav_list">
                      <li>
                        <NavLink to="/user-profile" className="flex-center">
                          <CiUser className="logout_icons" />
                          <span className="sub_nav_line">Profile</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/user-change-password" className="flex-center">
                          <CiUnlock className="logout_icons " />
                          <span className="sub_nav_line">Change Password</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/user-delete-account" className="flex-center">
                          <CiTrash className="logout_icons " />
                          <span className="sub_nav_line">Delete Account</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <div className="log_icon" onClick={logout}>
                  <NavLink  className="opened">
                    <CiLogout className="logout_icon" />
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
