// components/UI/Cards/SimpleCard.jsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./SimpleCard.css";

export default function SimpleCard({
  text = "Click Here",
  cssClass = "simpleBtn",
  fontstyle = "",
  height = "h-[158px] max-h-[158px]",
  width = "w-[158px] max-w-[158px]",
  size = "",
  padding = "px-5",
  border = "",
  backgroundImage = "none",
  className = "relative rounded-2xl flex items-center justify-center gap-2 transition-colors overflow-hidden cursor-pointer",
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
  bgImage = false,
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
      {bgImage && (
        <Image
          className="absolute z-0 mx-auto h-full w-full object-cover"
          src={bgImage}
          alt="bg"
          width={480}
          height={480}
        />
      )}
      {text}
    </button>
  );
}
