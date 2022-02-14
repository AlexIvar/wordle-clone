import React from "react";
import { Tanslations } from "../Data/Translations.js";
import DarkModeToggle from "../Components/DarkModeToggle";
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
      <div>
        <div id="settingsTitle">{Tanslations.settings[props.language]}</div>
        <div></div>
      </div>
      <div>
        <div id="settingsText">{Tanslations.language[props.language]}</div>
        <div>
          <div>
            <div>
              <button
                className={
                  props.language === "is"
                    ? "settingsButton selected"
                    : "settingsButton"
                }
                value={"is"}
                onClick={(e) => handleLanguageClick(e, "value")}
              >
                {Tanslations.icelandic[props.language]}
              </button>
            </div>
            <div>
              <button
                className={
                  props.language === "en"
                    ? "settingsButton selected"
                    : "settingsButton"
                }
                value={"en"}
                onClick={(e) => handleLanguageClick(e, "value")}
              >
                {Tanslations.english[props.language]}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="settingsText">{Tanslations.difficulty[props.language]}</div>
        <div>
          {" "}
          <div>
            <div>
              <button
                className={
                  props.level === "easy"
                    ? "settingsButton selected"
                    : "settingsButton"
                }
                value={"easy"}
                onClick={(e) => handleDifficultyClick(e, "value")}
              >
                {Tanslations.easy[props.language]}
              </button>
            </div>
            <div>
              <button
                className={
                  props.level === "hard"
                    ? "settingsButton selected"
                    : "settingsButton"
                }
                value={"hard"}
                onClick={(e) => handleDifficultyClick(e, "value")}
              >
                {Tanslations.hard[props.language]}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="settingsText">{Tanslations.sounds[props.language]}</div>
        <div>
          <div>
            <div>
              <button
                className={
                  props.sounds === "on"
                    ? "settingsButton selected"
                    : "settingsButton"
                }
                value={"on"}
                onClick={(e) => handleSoundsClick(e, "value")}
              >
                {/*<HiOutlineVolumeUp />*/}
                {Tanslations.on[props.language]}
              </button>
            </div>
            <div>
              <button
                className={
                  props.sounds === "off"
                    ? "settingsButton selected"
                    : "settingsButton"
                }
                value={"off"}
                onClick={(e) => handleSoundsClick(e, "value")}
              >
                {/*<HiOutlineVolumeOff /> */}
                {Tanslations.off[props.language]}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="settingsText">Dark mode</div>
              <DarkModeToggle sounds={props.sounds}/>
      </div>
      <div></div>
    </div>
  );
};

export default SettingsMenu;
