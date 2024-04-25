import React, { useState, useEffect } from 'react';
import AxiosService from '../common/ApiService';
import tempImag from "../assets/images/tempImag.png";
import TopShirt from '../common/TopShirt';
import BottomPant from '../common/Pant';
import LeftShoe from '../common/LeftShoe';
import RightShoe from '../common/RightShoe';

function Dashboard() {
  const id = sessionStorage.getItem('id');
  const [userData, setUserData] = useState(null);
  const [reversedShirtColors, setReversedShirtColors] = useState([]);
  const [reversedPantColors, setReversedPantColors] = useState([]);
  const [reversedShoeColors, setReversedShoeColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await AxiosService.get(`/user/signin/${id}`);
      setUserData(res.data.user);
      const reversedShirtColors = res.data.user && res.data.user.recentShirtColors ? [...res.data.user.recentShirtColors].reverse() : [];
      setReversedShirtColors(reversedShirtColors);
      const reversedPantColors = res.data.user && res.data.user.recentPantColors ? [...res.data.user.recentPantColors].reverse() : [];
      setReversedPantColors(reversedPantColors);
      const reversedShoeColors = res.data.user && res.data.user.recentShoeColors ? [...res.data.user.recentShoeColors].reverse() : [];
      setReversedShoeColors(reversedShoeColors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  }, [reversedShirtColors, reversedPantColors, reversedShoeColors]);

  const handleButtonClick = async () => {
    try {
      const res = await AxiosService.put(`/user/suggest-colors/${id}`);
      console.log(res.data); // Log the response for debugging
      fetchData(); // Update data after suggestions are made
    } catch (error) {
      console.error(error);
    }
  };


 



  

  return (
    <section className="dashboard_view bg_contain">
      <div className='content_containers'>
        <div className='choose_colors'>
          <div className="color_pick">
            <div className='top_img'>
              <TopShirt ColorSet={reversedShirtColors[0]} />
            </div>
            <img
              src={tempImag}
              className="banner_img"
              alt="Dress color suggestions"
              title="Dress color suggestions"
            />
            <div className='pant_image'>
              <BottomPant PantColor={reversedPantColors[0]} />
            </div>
            <div className='shoe_set'>
              <LeftShoe LeftShoeColor={reversedShoeColors[0]} />
            </div>
            <div className='shoe_set_two'>
              <RightShoe RightShoeColor={reversedShoeColors[0]} />
            </div>
          </div>

          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className='pick_select_option'>
                {(userData && userData.shirtColors && userData.pantColors && userData.shoeColors &&
                  userData.shirtColors.length && userData.pantColors.length && userData.shoeColors.length) ? (
                  <div className='color_action'>
                  <div className="sign_ins"><span className="signin">My Collections</span></div>
                  {/* Shirt color selection */}
                  <div className='color_one'>
                    <p className='color_name'>Shirt</p>
                    <div className='color_picked'>
                      <ul className='color_picked_set'>
                        {userData.shirtColors.map((color, index) => (
                          <li key={index}>
                            <span className='circled_color' style={{ backgroundColor: color }}></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Pant color selection */}
                  <div className='color_one'>
                    <p className='color_name'>Pant</p>
                    <div className='color_picked'>
                      <ul className='color_picked_set'>
                        {userData.pantColors.map((color, index) => (
                          <li key={index}>
                            <span className='circled_color' style={{ backgroundColor: color }}></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Shoe color selection */}
                  <div className='color_one'>
                    <p className='color_name'>Shoe</p>
                    <div className='color_picked'>
                      <ul className='color_picked_set'>
                        {userData.shoeColors.map((color, index) => (
                          <li key={index}>
                            <span className='circled_color' style={{ backgroundColor: color }}></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Today's color suggestion */}
                  <div className='color_one'>
                    <p className='color_name'>Today Color Suggestion</p>
                    <div className='color_picked'>
                      <ul className='color_picked_set'>
                        <li><span className='circled_color' style={{ backgroundColor: reversedShirtColors[0] }}></span></li>
                        <li><span className='circled_color' style={{ backgroundColor: reversedPantColors[0] }}></span></li>
                        <li><span className='circled_color' style={{ backgroundColor: reversedShoeColors[0] }}></span></li>
                      </ul>
                      <div className='view_color'>
                        <button className='change_color_view' onClick={handleButtonClick}>Change Color</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="about">
                  <div className="header_content">
                    <span className="wel_kit">Welcome to</span>
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
                  <div className="st_one">
                    <p className="st_para"> Start by adding color collections for Dress, Hand Bag, Watch, and Shoe.</p>
                    <div className="text-center">
                      <button className="st_button" onClick={handleButtonClick}>create your collections</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
