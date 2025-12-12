// Exam/UI/Inputs/SimpleInput.jsx
import Image from "next/image";
import "./SimpleInput.css";
import { useState } from "react";

export default function SimpleInput({
  label = "Type Here",
  id = "",
  cssClass = "",
  className = "rounded-full",
  height = "lg:h-12 lg:min-h-12 h-10 min-h-10",
  width = "w-full",
  size = "",
  padding = "lg:px-5 px-3",
  border = "",
  textStyle = "",
  fontStyle = "lg:text-[16px] text-[14px]",
  theme = "light",
  darkTheme = "",
  lightTheme = "border border-solid border-black/[.08] hover:border-black/[.3] focus:border-black/[.3]",
  value,
  type = "text",
  icon = false,
  onClick,
  disabled = false,
  required = true,
  onChange,
}) {
  const [focusLabel, setFocusLabel] = useState(false);

  return (
    <div className="inputDiv relative w-full">
      <label
        htmlFor={id}
        onClick={() => {
          setFocusLabel(true);
        }}
        className={`inputLabel ${fontStyle} ${textStyle} ${
          (focusLabel || value) && "FocusLabel"
        }`}
      >
        {icon && <Image src={icon} alt="icon" width={16} height={16} />}
        {label} {required && <span>*</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        // form={form}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onClick={() => {
          onClick;
          setFocusLabel(true);
        }}
        onBlur={() => {
          if (value.length === 0) setFocusLabel(false);
        }}
        style={{ border: border }}
        className={`simpleInput ${cssClass} ${className} ${padding} ${height} ${width} ${size} ${fontStyle} ${textStyle}
          ${disabled ? "disabledInput" : ""}
          ${theme === "dark" ? darkTheme : ""}
          ${theme === "light" ? lightTheme : ""}
        `}
      />
    </div>
  );
}
