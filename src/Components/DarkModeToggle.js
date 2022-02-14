import { useState } from "react";
import { useColorScheme } from "../Platform/ColorScheme.tsx";
import "../Components/DarkModeToggle.scss";
import pop from "../Sounds/switch.mp3";
import useSound from "use-sound";

const DarkModeToggle = ({ sounds }) => {
  const { isDark, setIsDark } = useColorScheme();

  const [playbackRate, setPlaybackRate] = useState(0.65);
  const [play] = useSound(pop, {
    playbackRate,
    volume: sounds === "on" ? 0.5 : 0,
  });

  return (
    <div>
      <input
        type="checkbox"
        id="toggle"
        checked={isDark === "dark"}
        onChange={(event) => setIsDark(event.target.checked ? "dark" : "light")}
        aria-label="Dark mode"
        onClick={() => play()}
      />
      <label htmlFor="toggle"></label>
    </div>
  );
};

export default DarkModeToggle;
