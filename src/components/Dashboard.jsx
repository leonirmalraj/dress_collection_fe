import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import AxiosService from '../common/ApiService';

function Dashboard() {
  const id = sessionStorage.getItem('id');
  const [userData, setUserData] = useState(null);
  const [reversedShirtColors, setReversedColors] = useState([]);
  const [reversedPantColors, setReversedWatchColors] = useState([]);
  const [reversedShoeColors, setReversedShoeColors] = useState([]);

  const fetchData = async () => {
    try {
      const res = await AxiosService.get(`/user/signin/${id}`);
      setUserData(res.data.user);

      // Update reversedShirtColors array with recent dress colors
      const reversedShirtColors = res.data.user && res.data.user.recentShirtColors ? [...res.data.user.recentShirtColors].reverse() : [];
      setReversedColors(reversedShirtColors);

      // Update reversedPantColors array with recent watch colors
      const reversedPantColors = res.data.user && res.data.user.recentPantColors ? [...res.data.user.recentPantColors].reverse() : [];
      setReversedWatchColors(reversedPantColors);

      // Update reversedBagColors array with recent bag colors
      // const reversedBagColors = res.data.user && res.data.user.recentBagColors ? [...res.data.user.recentBagColors].reverse() : [];
      // setReversedBagColors(reversedBagColors);

      // Update reversedShoeColors array with recent shoe colors
      const reversedShoeColors = res.data.user && res.data.user.recentShoeColors ? [...res.data.user.recentShoeColors].reverse() : [];
      setReversedShoeColors(reversedShoeColors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const suggestColor = async () => {
    try {
      const res = await AxiosService.put(`/user/suggest-color/${id}`);
      console.log("suggest-color:", res);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const suggestWatchColor = async () => {
    try {
      const res = await AxiosService.put(`/user/suggest-watch-color/${id}`);
      console.log("suggest-watch-color:", res);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const suggestShoeColor = async () => {
    try {
      const res = await AxiosService.put(`/user/suggest-shoe-color/${id}`);
      console.log("suggest-shoe-color:", res);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const suggestBagColor = async () => {
    try {
      const res = await AxiosService.put(`/user/suggest-bag-color/${id}`);
      console.log("suggest-bag-color:", res);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // Define a new function to call all color suggestion functions
  const handleButtonClick = () => {
    suggestColor();
    suggestWatchColor();
    suggestBagColor();
    suggestShoeColor();
  };

  return (
    <div className='dashboard_view bg_contain'>
      <div className='content_container'>
      <div className="container c1">
        {userData && (
          <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)', backdropFilter: 'blur(10px)' }}>
            <thead>
              <tr className='tbn'>
                <th scope="col">My Collections</th>
                <th scope="col">Colors</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row">Shirts</th>
                <td>
                  {userData.shirtColors.length === 0 ? (
                    "Add shirts color by clicking Add details"
                  ) : (
                    userData.shirtColors.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index !== userData.shirtColors.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                      </span>
                    ))
                  )}
                </td>
              </tr>
                <tr className='tbn'>
                  <th scope="row">Pants</th>
                  <td>
                    {userData.pantColors.length === 0 ? (
                      "Add pants color by clicking Add details"
                    ) : (
                      userData.pantColors.map((color, index) => (
                        <span key={index}>
                          {color}
                          {index !== userData.pantColors.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                        </span>
                      ))
                    )}
                  </td>
                </tr>
              <tr className='tbn'>
                <th scope="row">Shoes</th>
                <td>
                  {userData.shoeColors.length === 0 ? (
                    "Add shoes color by clicking Add details"
                  ) : (
                    userData.shoeColors.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index !== userData.shoeColors.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                      </span>
                    ))
                  )}
                </td>
                </tr>
         
            </tbody>
          </table>
        )}
      </div>

      <div className="container c1">
        {userData && (
          <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)', backdropFilter: 'blur(10px)' }}>
            <thead>
              <tr className='tbn'>
                <th colSpan={reversedShirtColors.length + 1}>Last 1 Week Shirts Color Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row">Day</th>
                {reversedShirtColors.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr className='tbn'>
                <th scope="row">Color</th>
                {reversedShirtColors.map((color, index) => (
                  <td style={{ color: `${color}` }} key={index}>{color}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="container c1">
        {userData && (
          <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)', backdropFilter: 'blur(10px)' }}>
            <thead>
              <tr className='tbn'>
                <th colSpan={reversedPantColors.length + 1}>Last 1 Week Pants Color Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row" style={{ width: '100px' }}>Day</th> {/* Adjust width as needed */}
                {reversedPantColors.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr className='tbn'>
                <th scope="row">Color</th>
                {reversedPantColors.map((color, index) => (
                  <td style={{ color: `${color}` }} key={index}>{color}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>


      {/* Last 1 Week Shoe Color Suggestions Table */}
      <div className="container c1">
        {userData && (
          <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)', backdropFilter: 'blur(10px)' }}>
            <thead>
              <tr className='tbn'>
                <th colSpan={reversedShoeColors.length + 1}>Last 1 Week Shoes Color Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row" style={{ width: '100px' }}>Day</th> {/* Adjust width as needed */}
                {reversedShoeColors.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr className='tbn'>
                <th scope="row">Color</th>
                {reversedShoeColors.map((color, index) => (
                  <td style={{ color: `${color}` }} key={index}>{color}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="form-box1">
        <div className="container">
          <Form className="input-group d-flex flex-column">
            <div className="d-flex flex-column no-wrap text-center pt-3">
              <div>
                <Button type="button" className="suggest-btn" onClick={handleButtonClick}>Suggest Color</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
