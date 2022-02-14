import React from "react";
import { Tanslations } from "../Data/Translations";
import "./GameMenu.css";

export const GameMenu = (props) => {
  return (
    <div
      className={
        props.settingsShown ? "card-items-menu hide" : "card-items-menu show"
      }
    >
      {props.gameResult === "" && (
        <>
          <div id="settingsMenuTitle">
            {Tanslations.welcomeText[props.language]}
          </div>
          <div id="settingsMenuText">
            {Tanslations.welcomeTextSubtitle[props.language]}
          </div>

          <div></div>
        </>
      )}

      {props.gameResult !== "" && (
        <>
          <div id="settingsMenuTitle">
            {props.gameResult === "won"
              ? Tanslations.winningText[props.language]
              : Tanslations.looseText[props.language]}
          </div>
          <div id="settingsMenuText">
            {props.gameResult === "won"
              ? Tanslations.winningText2[props.language]
              : Tanslations.looseText2[props.language]}
          </div>
          <div>
            <div>{Tanslations.TheAnswerWas[props.language]}</div>
            <div>{props.answer}</div>
          </div>
        </>
      )}
      <div></div>
      <div>
        <div>
          <button
            onClick={() => props.onStartNewGame()}
            className="newGameButton"
          >
            New Game
          </button>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default GameMenu;
