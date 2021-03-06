import React, { useState } from "react";
import "../Styles/Header.scss";
import { FiSettings } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import pop from "../Sounds/pop.mp3";
import useSound from "use-sound";

export const Header = (props) => {
  const [spin, setSpin] = useState(false);

  /*const [playbackRate, setPlaybackRate] = useState(0.9);
  const [play] = useSound(pop, {
    playbackRate,
    volume: props.sounds === "on" ? 0.5 : 0,
  });*/

  //Function that hides and show the settings menu
  const handleSettingsClick = () => {
    /*setPlaybackRate(playbackRate); //+ 0.1);
    if(!spin) play();*/
    setSpin((prev) => !prev);
    props.onSettingsClicked();
  };

  const settingsSpin = {
    animation: "spin 0.6s backwards linear",
  };

  return (
    <div className="header-container">
      <h2 className="moveFromBottom">
        Pipers dream<span id="dot">.</span>
      </h2>
      <div className="settings-button" onClick={handleSettingsClick}>
        {!spin && <FiSettings/>}
        {spin && <FaTimes style={spin && settingsSpin}/>}
      </div>
    </div>
  );
};

export default Header;
