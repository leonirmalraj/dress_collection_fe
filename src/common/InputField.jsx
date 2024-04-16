import React from "react";

function InputField({ InputType }) {
  return (
    <div className="one_type">
      <div className="one_div">
        {/* <CiMail className="font_set" /> */}
        <input
          type={InputType}
          className="input_cloud"
          placeholder="Email ID"
        />
      </div>
    </div>
  );
}

export default InputField;
