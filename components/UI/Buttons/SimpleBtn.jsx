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
  boxShadow = "",
  backgroundImage = false,
  bgImageOpacity = "100",
  className = "relative rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer",
  tailwind = "",
  theme = "",
  darkTheme = "bg-[#171717] text-[#ffffff] active:bg-[#383838]",
  lightTheme = "border border-solid border-black/[.08] active:border-transparent active:bg-black/[.04]",
  value = "",
  type = "submit",
  logo = false,
  icon = false,
  onClick = false,
  navigateTo = false,
  disabled = false,
  notify = false,
  textStyle = "",
  fontStyle = "lg:text-[16px] text-[14px]",
}) {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <button
      type={type}
      value={value}
      disabled={disabled}
      onClick={() => {
        onClick && onClick();
        navigateTo && navigate(navigateTo);
      }}
      style={{
        border: `${border}`,
        boxShadow: `${boxShadow}`,
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
      }}
      className={`${cssClass} ${className} ${tailwind} ${padding} ${height} ${width} ${size} ${fontstyle} 
        ${disabled && "Disabled"} 
        ${!notify && "overflow-hidden"}
        ${theme == "dark" && darkTheme} 
        ${theme == "dark" && "BBB"} 
        ${theme == "light" && lightTheme}`}
    >
      {notify && (
        <div className="bg-[#ff2525] md:min-w-[10px] min-w-[8px] md:w-[10px] w-[8px] md:min-h-[10px] min-h-[8px] md:h-[10px] h-[8px] rounded-full absolute top-0 right-0"></div>
      )}

      {icon && icon}

      {logo && (
        <Image className="z-1" src={logo} alt="logo" width={16} height={16} />
      )}

      {text && <div className={`${fontStyle} ${textStyle} z-1`}>{text}</div>}

      {backgroundImage && (
        <Image
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full object-cover z-0 opacity-${bgImageOpacity}`}
          src={backgroundImage}
          alt="bg"
          width={480}
          height={480}
        />
      )}
    </button>
  );
}
