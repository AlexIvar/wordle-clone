import React from "react";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";
import "./SettingsMenu.css";

export const SettingsMenu = (props) => {
  const handleLanguageClick = (e) => {
    e.preventDefault();
    props.setLanguage(e.target.value);
  };

  const handleDifficultyClick = (e) => {
    e.preventDefault();
    props.setLevel(e.target.value);
  };

  const handleSoundsClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    props.setSounds(e.target.value);
  };

  return (
    <div
      className={
        props.settingsShown
          ? "card-items-settings showSettings"
          : "card-items-settings hideSettings"
      }
    >
      {console.log(props)}
      <div id="settingsTitle">Stillingar</div>
      <div></div>
      <div id="settingsText">Tungumál</div>
      <div>
        <div>
          <button
            className={props.language === "is" ? "selected" : ""}
            value={"is"}
            onClick={(e) => handleLanguageClick(e, "value")}
          >
            Íslenska
          </button>
        </div>
        <div>
          <button
            className={props.language === "en" ? "selected" : ""}
            value={"en"}
            onClick={(e) => handleLanguageClick(e, "value")}
          >
            English
          </button>
        </div>
      </div>
      <div id="settingsText">Erfiðleikastig</div>
      <div>
        <div>
          <button
            className={props.level === "easy" ? "selected" : ""}
            value={"easy"}
            onClick={(e) => handleDifficultyClick(e, "value")}
          >
            Létt
          </button>
        </div>
        <div>
          <button
            className={props.level === "hard" ? "selected" : ""}
            value={"hard"}
            onClick={(e) => handleDifficultyClick(e, "value")}
          >
            Erfitt
          </button>
        </div>
      </div>
      <div id="settingsText">Hljóðbrellur</div>
      <div>
        <div>
          <button
            className={props.sounds === "on" ? "selected" : ""}
            value={"on"}
            onClick={(e) => handleSoundsClick(e, "value")}
          >
            {/*<HiOutlineVolumeUp />*/}Á
          </button>
        </div>
        <div>
          <button
            className={props.sounds === "off" ? "selected" : ""}
            value={"off"}
            onClick={(e) => handleSoundsClick(e, "value")}
          >
            {/*<HiOutlineVolumeOff /> */}Af
          </button>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SettingsMenu;
