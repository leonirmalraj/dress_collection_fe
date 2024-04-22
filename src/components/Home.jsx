import React from "react";
import "../assets/css/header.css";
import "../assets/css/home.css";

import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import Carousel from "react-bootstrap/Carousel";
import banner_one from "../assets/images/banner_one.png";
import banner_two from "../assets/images/banner_two.png";
import banner_three from "../assets/images/banner_three.png";
import banner_four from "../assets/images/banner_four.png";
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
                Daily Dress Color <span className="line_set">Suggestions</span>
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
                alt="Dress color suggestions"
                title="Dress color suggestions"
              />
              {/* <Carousel data-bs-theme="dark">
                <Carousel.Item>
                  <div className="carousel_image">
                    <img className="img" src={banner_two} alt="First slide" />
                  </div>
                  <Carousel.Caption>
                    <h5>
                      Embrace colors that effortlessly blend into the natural
                      landscape.
                    </h5>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel_image">
                    <img className="img" src={banner_three} alt="First slide" />
                  </div>
                  <Carousel.Caption>
                    <h5>
                      Embrace colors that effortlessly blend into the natural
                      landscape.
                    </h5>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel_image">
                    <img className="img" src={banner_four} alt="First slide" />
                  </div>
                  <Carousel.Caption>
                    <h5>
                      Embrace colors that effortlessly blend into the natural
                      landscape.
                    </h5>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="carousel_image">
                    <img className="img" src={banner_one} alt="First slide" />
                  </div>
                  <Carousel.Caption>
                    <h5>
                      Embrace colors that effortlessly blend into the natural
                      landscape.
                    </h5>
                    <p></p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel> */}
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
                  Start by adding color collections for Dress, Hand Bag, Watch,
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
                  Start by adding color collections for Dress, Hand Bag, Watch,
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
                  Start by adding color collections for Dress, Hand Bag, Watch,
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
