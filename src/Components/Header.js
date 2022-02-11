import React, { useState } from "react";
import "./Header.css";
import { FiSettings } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

export const Header = (props) => {
  const [spin, setSpin] = useState(false);

  //Function that hides and show the settings menu
  const handleSettingsClick = () => {
    setSpin((prev) => !prev);
    props.onSettingsClicked();
  };

  const settingsSpin = {
    animation: "spin 0.4s backwards linear",
  };

  return (
    <div className="header-container">
      <h2 className="moveFromBottom">
        Pipers dream<span id="dot">.</span>
      </h2>
      <div className="settings-button" onClick={handleSettingsClick}>
        <span className="logo">
          {!spin && <FiSettings style={!spin && settingsSpin} />}
          {spin && <FaTimes style={spin && settingsSpin} />}
        </span>
      </div>
    </div>
  );
};

export default Header;
