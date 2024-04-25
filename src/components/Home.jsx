import React from "react";
import "../assets/css/header.css";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Banner from "../assets/images/banner.png";
const Home = () => {
  const token = sessionStorage.getItem('token')
  return (
    <>
      <nav className="navbar_show">
        <div className="content_container">
          <div className="nav_list">
            <div className="navbar-container">
              <ul className="navbar-links">
                <li>
                  <img
                    src={Logo}
                    className="logo"
                    alt="DRESS"
                    title="DRESS COLORS"
                  />
                </li>
              </ul>
            </div>
            <div className="nav_showing">
              <ul className="navbar-links">
                {token ? 
                  <li>
                    <NavLink to="/dashboard" className="opened">
                      <span className="goto_colors">dashboard</span>
                    </NavLink>
                  </li> : <>
                    <li>
                      <NavLink to="/signin" className="opened">
                        <span className="goto_colors">signin</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/signup" className="opened">
                        <span className="goto_colors">signup</span>
                      </NavLink>
                    </li></>}
                
               
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <section className="banner_settings">
        <div className="content_container">
          <div className="header_contact">
            <div className="header_content">
              <h1 className="header_title">
                Dress
                <span className="colorful C">C</span><span className="colorful O">o</span>
                <span className="colorful L">l</span><span className="colorful O">o</span>
                <span className="colorful R">r</span><span className="colorful S">s</span>
                Craze
              </h1>
              <p className="header_para">
                simplifies fashion decisions, offering personalized color
                recommendations for attire. Its intuitive features ensure
                effortless coordination, making fashion enjoyable and
                stress-free.
              </p>
            </div>

            <div className="home_slider">
              <img
                src={Banner}
                className="banner_img"
                alt="Dress Colors Craze"
                title="Dress Colors Craze"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <div className="content_container">
          <h1 className="how_header text-center ">How it works?</h1>

          <div className="show_steps">
            <div className="how_one">
              <div className="circle_one">
                <p className="step_one">
                  <span className="circle_set c_one">1</span>
                </p>
              </div>

              <div className="circle_header">
                <p className="step_para">
                  Start by adding color collections for Shirt, Pant,
                  and Shoe.
                </p>
              </div>
            </div>

            <div className="how_one">
              <div className="circle_one">
                <p className="step_one">
                  <span className="circle_set c_two">2</span>
                </p>
              </div>

              <div className="circle_header">
                <p className="step_para">
                  Start by adding color collections for Shirt, Pant,
                  and Shoe.
                </p>
              </div>
            </div>

            <div className="how_one">
              <div className="circle_one">
                <p className="step_one">
                  <span className="circle_set c_three">3</span>
                </p>
              </div>

              <div className="circle_header">
                <p className="step_para">
                  Start by adding color collections for Shirt, Pant,
                  and Shoe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
