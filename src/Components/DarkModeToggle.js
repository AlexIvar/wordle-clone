//import Toggle from "react-toggle";
import { useColorScheme } from "../Platform/ColorScheme.tsx";
import "../Components/DarkModeToggle.scss";
//import { MdOutlineModeNight } from "react-icons/md";
//import { BiSun } from "react-icons/bi";

const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();
  return (
    <div>
      <input
        type="checkbox"
        id="toggle"
        checked={isDark === "dark"}
        onChange={(event) => setIsDark(event.target.checked ? "dark" : "light")}
        //icons={{ checked: <MdOutlineModeNight />, unchecked: <BiSun /> }}
        aria-label="Dark mode"
      />
      <label for="toggle"></label>
    </div>
  );
};

export default DarkModeToggle;
