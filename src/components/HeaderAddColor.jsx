import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import "../assets/css/header.css"; // Import CSS for styling
import { CiHome, CiUser, CiLogout } from "react-icons/ci";
import useLogout from '../common/useLogout'


const Navbar = () => {
    const logout = useLogout();

    return (
        <nav className="navbar_show">
            <div className="content_container">
                <div className="nav_list">
                    <div className="navbar-container">
                        <ul className="navbar-links">
                            <li>
                                <NavLink to="/" ClassName="opened">
                                    <CiHome className="dash_icon" />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="nav_showing">
                        <ul className="navbar-links">                          

                            <li>
                                <div className="log_icon">
                                    <NavLink to="/addcolors" className="opened">
                                        <CiUser className="logout_icon " />
                                    </NavLink>
                                </div>
                            </li>

                            <li>
                                <div className="log_icon" onClick={logout}>
                                    <NavLink to="/addcolors" className="opened" >
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
