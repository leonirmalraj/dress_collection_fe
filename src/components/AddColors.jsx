import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import "../assets/css/addcolor.css";
import { CiCircleChevLeft } from "react-icons/ci";
import "../assets/css/login.css";
import "../assets/css/header.css";
const AddColors = () => {
  let navigate = useNavigate();
  let id = sessionStorage.getItem("id");
  const colorOptions = [
    "Red",
    "Blue",
    "Green",    
    "Purple",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Gray",   
    "Violet",
    "Maroon",
    "Olive",
    "Navy",   
  ];

  const [selectedDressColors, setSelectedDressColors] = useState([]);
  const [showDressColorOptions, setShowDressColorOptions] = useState(false);

  const [selectedShoeColors, setSelectedShoeColors] = useState([]);
  const [showShoeColorOptions, setShowShoeColorOptions] = useState(false);

  const [selectedWatchColors, setSelectedWatchColors] = useState([]);
  const [showWatchColorOptions, setShowWatchColorOptions] = useState(false);

  const [selectedBagColors, setSelectedBagColors] = useState([]);
  const [showBagColorOptions, setShowBagColorOptions] = useState(false);

  const fetchData = async () => {
    try {
      const res = await AxiosService.get(`/user/signin/${id}`);

      setSelectedDressColors(res.data.user.dresscolor);
      setSelectedShoeColors(res.data.user.shoecolor);
      setSelectedWatchColors(res.data.user.watchcolor);
      setSelectedBagColors(res.data.user.bagcolor);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (color, setSelectedColors) => {
    setSelectedColors((prevColors) => {
      const isSelected = prevColors.includes(color);
      return isSelected
        ? prevColors.filter((selectedColor) => selectedColor !== color)
        : [...prevColors, color];
    });
  };

  const handleToggleColorOptions = (setShowColorOptions) => {
    setShowColorOptions((prev) => !prev);
  };

  const handleInputChange = (e, setSelectedColors, setShowColorOptions) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      handleCheckboxChange(value, setSelectedColors);
    } else {
      setSelectedColors([value]);
    }
  };

  const createColorInputSection = (
    label,
    selectedColors,
    setSelectedColors,
    showColorOptions,
    setShowColorOptions
  ) => (
    <div className="dropdown_code">
      <label htmlFor={`${label.toLowerCase()}Color`} className="form-label">
        {label} Color
      </label>
      <div className="input-group">
        <input
          type="text"
          className="input_form"
          id={`${label.toLowerCase()}Color`}
          name={label.toLowerCase()}
          value={(selectedColors || []).join(", ")}
          placeholder="Pick a Color"
          readOnly
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => handleToggleColorOptions(setShowColorOptions)}
        >
          +
        </button>
      </div>
      {showColorOptions && (
        <div className="pick_color">
          <div className="color-options">
            {colorOptions.map((color) => (
              <div key={color} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`${label.toLowerCase()}-${color}`}
                  name={label.toLowerCase()}
                  value={color}
                  checked={selectedColors?.includes(color)}
                  onChange={(e) =>
                    handleInputChange(e, setSelectedColors, setShowColorOptions)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`${label.toLowerCase()}-${color}`}
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  let validateuserdetails = async (event) => {
    try {
      event.preventDefault();

      const dresscolor = selectedDressColors;
      const shoecolor = selectedShoeColors;
      const watchcolor = selectedWatchColors;
      const bagcolor = selectedBagColors;

      let res = await AxiosService.put(`/user/signin/${id}`, {
        dresscolor,
        shoecolor,
        watchcolor,
        bagcolor,
      });

      if (res.status === 200) {
        toast.success("User updated Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occurred! Please try after some time"
      );
    }
  };

  return (
    
    <section className="color_section">
      <div className="content_container dash1 txt">
       
        <h1 className="set_color">Color Form</h1>
        <div className="back_to" onClick={handleGoBack}>
          <span className="goto"><CiCircleChevLeft className="go_back" />fgdgfdg</span>
        </div>
        <form className="color_choose_center">
          <div className="">
            {createColorInputSection(
              "Shirt",
              selectedDressColors,
              setSelectedDressColors,
              showDressColorOptions,
              setShowDressColorOptions
            )}
          </div>
          <div className="">
            {createColorInputSection(
              "Pant",
              selectedWatchColors,
              setSelectedWatchColors,
              showWatchColorOptions,
              setShowWatchColorOptions
            )}
          </div>
          <div className="">
            {createColorInputSection(
              "Shoe",
              selectedShoeColors,
              setSelectedShoeColors,
              showShoeColorOptions,
              setShowShoeColorOptions
            )}
          </div>
         
          {/* <div className="">
            {createColorInputSection(
              "Bag",
              selectedBagColors,
              setSelectedBagColors,
              showBagColorOptions,
              setShowBagColorOptions
            )}
          </div> */}
          <div className="button_display">
            <button className="btn_set cancel_button" onClick={handleGoBack}>Close</button>
            <button
              className="btn_set save_button"
              onClick={(event) => validateuserdetails(event)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddColors;
