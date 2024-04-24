import React from 'react'
import "../assets/css/header.css";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import { CiUser,CiUnlock, CiTrash } from "react-icons/ci";

function DropDownList() {
    return (
      <>
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
        </>
  )
}

export default DropDownList