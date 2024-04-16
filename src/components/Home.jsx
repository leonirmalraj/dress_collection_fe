import React from "react";
import "../assets/css/home.css";
import "../assets/css/header.css";
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import Carousel from "react-bootstrap/Carousel";
import banner_one from "../assets/images/banner_one.png";
import banner_two from "../assets/images/banner_two.png";
import banner_three from "../assets/images/banner_three.png";
import banner_four from "../assets/images/banner_four.png";
const Home = () => {
  return (
    <>
      <div className="main_container">
        <nav className="navbar">
          <div className="navbar-container">
            <ul className="navbar-links"></ul>
          </div>
          <ul className="navbar-links">
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </nav>

        <div className="home-wrapper">
          <Carousel data-bs-theme="dark">
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
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home;
