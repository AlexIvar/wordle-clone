import React from "react";
import { Tanslations } from "../Data/Translations.js";
import "./SettingsMenu.css";
/*import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";*/

export const SettingsMenu = (props) => {
  const handleLanguageClick = (e) => {
    e.preventDefault();
    props.onLanguageChange(e.target.value);
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
      <div id="settingsTitle">{Tanslations.settings[props.language]}</div>
      <div></div>
      <div id="settingsText">{Tanslations.language[props.language]}</div>
      <div>
        <div>
          <button
            className={props.language === "is" ? "selected" : ""}
            value={"is"}
            onClick={(e) => handleLanguageClick(e, "value")}
          >
            {Tanslations.icelandic[props.language]}
          </button>
        </div>
        <div>
          <button
            className={props.language === "en" ? "selected" : ""}
            value={"en"}
            onClick={(e) => handleLanguageClick(e, "value")}
          >
            {Tanslations.english[props.language]}
          </button>
        </div>
      </div>
      <div id="settingsText">{Tanslations.difficulty[props.language]}</div>
      <div>
        <div>
          <button
            className={props.level === "easy" ? "selected" : ""}
            value={"easy"}
            onClick={(e) => handleDifficultyClick(e, "value")}
          >
            {Tanslations.easy[props.language]}
          </button>
        </div>
        <div>
          <button
            className={props.level === "hard" ? "selected" : ""}
            value={"hard"}
            onClick={(e) => handleDifficultyClick(e, "value")}
          >
            {Tanslations.hard[props.language]}
          </button>
        </div>
      </div>
      <div id="settingsText">{Tanslations.sounds[props.language]}</div>
      <div>
        <div>
          <button
            className={props.sounds === "on" ? "selected" : ""}
            value={"on"}
            onClick={(e) => handleSoundsClick(e, "value")}
          >
            {/*<HiOutlineVolumeUp />*/}
            {Tanslations.on[props.language]}
          </button>
        </div>
        <div>
          <button
            className={props.sounds === "off" ? "selected" : ""}
            value={"off"}
            onClick={(e) => handleSoundsClick(e, "value")}
          >
            {/*<HiOutlineVolumeOff /> */}
            {Tanslations.off[props.language]}
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
