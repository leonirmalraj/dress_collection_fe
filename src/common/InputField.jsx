import React from "react";

function InputField({ InputType, ClassType, Placeholder }) {
  return (
        <input
          type={InputType}
          className={ClassType}
          placeholder={Placeholder}
        />
  );
}

export default InputField;
