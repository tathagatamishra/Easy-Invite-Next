// Exam/UI/Buttons/SimpleBtn.jsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./SimpleBtn.css";

export default function SimpleBtn({
  text = "Click Here",
  cssClass = "simpleBtn",
  fontstyle = "",
  height = "h-12 min-h-12",
  width = "w-full sm:w-[158px] min-w-fit",
  size = "",
  padding = "px-5",
  border = "",
  backgroundImage = "none",
  className = "rounded-full flex items-center justify-center gap-2 transition-colors overflow-hidden cursor-pointer",
  tailwind = "",
  theme = "",
  darkTheme = "bg-[#171717] text-[#ffffff] active:bg-[#383838]",
  lightTheme = "border border-solid border-black/[.08] active:border-transparent active:bg-black/[.04]",
  value = "",
  type = "button",
  form = "",
  logo = false,
  icon = false,
  onClick = false,
  navigateTo = false,
  disabled = false,
}) {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <button
      type={type}
      form={form}
      value={value}
      disabled={disabled}
      onClick={() => {
        onClick && onClick();
        navigateTo && navigate(navigateTo);
      }}
      style={{
        border: `${border}`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className={`${cssClass} ${className} ${tailwind} ${padding} ${height} ${width} ${size} ${fontstyle} 
        ${disabled && "Disabled"} 
        ${theme == "dark" && darkTheme} 
        ${theme == "light" && lightTheme}`}
    >
      {icon && icon}
      {logo && (
        <Image className="" src={logo} alt="logo" width={16} height={16} />
      )}
      {text}
    </button>
  );
}
