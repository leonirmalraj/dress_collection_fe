import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import "../assets/css/header.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
      <ul className="navbar-links">
        {/* <li><NavLink to="/signin" activeClassName="active">Sign In</NavLink></li> */}
        {/* <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li> */}
        {/* <li><NavLink to="/profile" activeClassName="active">User Profile</NavLink></li> */}
        <li>
          <NavLink to="/addcolors" activeClassName="active">
            Add Colors
          </NavLink>
        </li>

        {/* <li><NavLink to="/about" activeClassName="active">About</NavLink></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
