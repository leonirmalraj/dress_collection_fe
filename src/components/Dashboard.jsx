import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import AxiosService from '../common/ApiService';

function Dashboard() {
  const id = sessionStorage.getItem('id');
  const [userData, setUserData] = useState(null);
  const [reversedColors, setReversedColors] = useState([]);
  const [reversedWatchColors, setReversedWatchColors] = useState([]);
  const [reversedBagColors, setReversedBagColors] = useState([]);
  const [reversedShoeColors, setReversedShoeColors] = useState([]);

  const fetchData = async () => {
    try {
      const res = await AxiosService.get(`/user/signin/${id}`);
      setUserData(res.data.user);

      // Update reversedColors array with recent dress colors
      const reversedColors = res.data.user && res.data.user.recentColors ? [...res.data.user.recentColors].reverse() : [];
      setReversedColors(reversedColors);

      // Update reversedWatchColors array with recent watch colors
      const reversedWatchColors = res.data.user && res.data.user.recentWatchColors ? [...res.data.user.recentWatchColors].reverse() : [];
      setReversedWatchColors(reversedWatchColors);

      // Update reversedBagColors array with recent bag colors
      const reversedBagColors = res.data.user && res.data.user.recentBagColors ? [...res.data.user.recentBagColors].reverse() : [];
      setReversedBagColors(reversedBagColors);

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
    <div className='dash1'>
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
                <th scope="row">Dress</th>
                <td>
                  {userData.dresscolor.length === 0 ? (
                    "Add dress color by clicking Add details"
                  ) : (
                    userData.dresscolor.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index !== userData.dresscolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                      </span>
                    ))
                  )}
                </td>
              </tr>
              <tr className='tbn'>
                <th scope="row">Watch</th>
                <td>
                  {userData.watchcolor.length === 0 ? (
                    "Add watch color by clicking Add details"
                  ) : (
                    userData.watchcolor.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index !== userData.watchcolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                      </span>
                    ))
                  )}
                </td>
              </tr>
              <tr className='tbn'>
                <th scope="row">Shoe</th>
                <td>
                  {userData.shoecolor.length === 0 ? (
                    "Add shoe color by clicking Add details"
                  ) : (
                    userData.shoecolor.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index !== userData.shoecolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                      </span>
                    ))
                  )}
                </td>
              </tr>
              <tr className='tbn'>
                <th scope="row">Bag</th>
                <td>
                  {userData.bagcolor.length === 0 ? (
                    "Add bag color by clicking Add details"
                  ) : (
                    userData.bagcolor.map((color, index) => (
                      <span key={index}>
                        {color}
                        {index !== userData.bagcolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
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
                <th colSpan={reversedColors.length + 1}>Last 1 Week Color Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row">Day</th>
                {reversedColors.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr className='tbn'>
                <th scope="row">Color</th>
                {reversedColors.map((color, index) => (
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
                <th colSpan={reversedWatchColors.length + 1}>Last 1 Week Watch Color Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row" style={{ width: '100px' }}>Day</th> {/* Adjust width as needed */}
                {reversedWatchColors.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr className='tbn'>
                <th scope="row">Color</th>
                {reversedWatchColors.map((color, index) => (
                  <td style={{ color: `${color}` }} key={index}>{color}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Last 1 Week Bag Color Suggestions Table */}
      <div className="container c1">
        {userData && (
          <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)', backdropFilter: 'blur(10px)' }}>
            <thead>
              <tr className='tbn'>
                <th colSpan={reversedBagColors.length + 1}>Last 1 Week Bag Color Suggestions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='tbn'>
                <th scope="row" style={{ width: '100px' }}>Day</th> {/* Adjust width as needed */}
                {reversedBagColors.map((_, index) => (
                  <td key={index}>{index + 1}</td>
                ))}
              </tr>
              <tr className='tbn'>
                <th scope="row">Color</th>
                {reversedBagColors.map((color, index) => (
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
                <th colSpan={reversedShoeColors.length + 1}>Last 1 Week Shoe Color Suggestions</th>
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
  );
}

export default Dashboard;
