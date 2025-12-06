// components/UI/Buttons/SimpleBtn.jsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./SimpleBtn.css";

export default function SimpleBtn({
  text = "Click Here",
  cssClass = "simpleBtn",
  fontstyle = "",
  height = "lg:h-12 lg:min-h-12 h-10 min-h-10",
  width = "lg:w-[158px] sm:w-[158px] w-full min-w-fit",
  size = "",
  padding = "lg:px-5 px-3",
  border = "",
  backgroundImage = "none",
  className = "relative rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer",
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
  notify = false,
  textStyle = "",
  fontStyle = "lg:text-[16px] md:text-[14px] text-[16px]",
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
        ${theme == "dark" && "BBB"} 
        ${theme == "light" && lightTheme}`}
    >
      {notify && (
        <div className="bg-[#ff2525] md:min-w-[10px] min-w-[8px] md:w-[10px] w-[8px] md:min-h-[10px] min-h-[8px] md:h-[10px] h-[8px] rounded-full absolute top-0 right-0"></div>
      )}
      {icon && icon}
      {logo && (
        <Image className="" src={logo} alt="logo" width={16} height={16} />
      )}
      <div className={`${fontStyle} ${textStyle}`}>{text}</div>
    </button>
  );
}
