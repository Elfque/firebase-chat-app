"use client";
import { useState } from "react";

const Input = ({ name, type, change, value, labelText }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="form_control">
      <label
        className={`sign_label text-sm ${
          value !== "" || active ? "move_up" : ""
        }`}
      >
        {labelText}
      </label>
      <input
        type={type}
        className="sign_input text-sm px-2 border-b-2 border-blue-200 w-full max-w-md"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={change}
        name={name}
        value={value}
        required
      />
    </div>
  );
};

export default Input;
