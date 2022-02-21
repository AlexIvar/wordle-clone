import React from "react";
import { Tanslations } from "../Data/Translations.js";
import DarkModeToggle from "../Components/DarkModeToggle";
import "../Styles/SettingsMenu.css";
import { useWindowDimensions } from "../Platform/useWindowDimensions.js"


/*import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";*/

export const SettingsMenu = (props) => {
  const handleLanguageClick = (e) => {
    e.preventDefault();
    props.onLanguageChange(e.target.value);
  };

  const handleDifficultyClick = (e) => {
      e.preventDefault();
      props.onDifficultyChange(e.target.value);
  };

  const handleSoundsClick = (e) => {
    e.preventDefault();
    props.setSounds(e.target.value);
  };
    

const { height, width } = useWindowDimensions();

    return (
      
    <div
      className={
        props.settingsShown
          ? "card-items-settings showSettings"
          : "card-items-settings hideSettings"
      }
      style={{
        "--letter-size": `${
          (height <= width ? (height / 9) * 0.75 : width / 9) * 0.9
        }px`,
      }}
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
          <div>
            <div>
              <button
                className={
                  props.difficulty === "easy"
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
                  props.difficulty === "hard"
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
        <div id="settingsText">{Tanslations.darkmode[props.language]}</div>
        <DarkModeToggle sounds={props.sounds} />
      </div>
    </div>
  );
};

export default SettingsMenu;
