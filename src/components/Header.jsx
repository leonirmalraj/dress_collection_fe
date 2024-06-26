import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import "../assets/css/header.css"; // Import CSS for styling
import { CiHome, CiUser, CiLogout, CiSun, CiUnlock, CiTrash } from "react-icons/ci";
import useLogout from "../common/useLogout";
import DropDownList from "./DropDownList";
import ModelWrapper from "./ModelWrapper";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const logout = useLogout();

  const handleModalToggle = () => {
    setShowModal(prev => !prev)
  }
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

              <li onClick={handleModalToggle}> 
                <div className="log_icon">
                  <div  className="opened">
                    <CiSun className="logout_icon " />
                    
                  </div>
                  {/* Modal integration on DropDownList */}
                  <ModelWrapper showModal={showModal} handleModalToggle={handleModalToggle}>
                    <DropDownList />
                  </ModelWrapper>
                 
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
