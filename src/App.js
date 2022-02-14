import React, { useState, useRef, useEffect } from "react";
import Card from "./Components/Card.js";
import Keyboard from "./Components/Keyboard.js";
import Header from "./Components/Header.js";
import SettingsMenu from "./Components/SettingsMenu.js";
import GameMenu from "./Components/GameMenu.js";
import useDynamicRefs from "use-dynamic-refs";
import { LetterKeys } from "./Data/LetterKeys.js";
import { prettyUpperWordList } from "./Data/WordsUpper.js";
import { englishUpperWordList } from "./Data/EnglishWords.js";
import { styles } from "./Data/AnimationStyles.js";
import { Tanslations } from "./Data/Translations.js";

/*Sounds*/
import pop from "./Sounds/pop.mp3";
import useSound from "use-sound";
import "./App.scss";

function App() {
  //There are 6 rows and 5 columns in the game
  const n = 5;
  const m = 6;

  const [matrix, setMatrix] = useState(
    Array.from({ length: m }, () => Array.from({ length: n }, () => ""))
  );

  //Current row of guesses
  const [currentRow, setCurrentRow] = useState(0);
  //Current letter column
  const [currentColum, setCurrentColumn] = useState(0);
  const [getRef, setRef] = useDynamicRefs();
  const [settingsShown, setSettingsShown] = useState(false);
  const [gameMenuShown, setGameMenuShown] = useState(true);
  /*Global settings */
  const [language, setLanguage] = useState("en");
  const [level, setLevel] = useState("hard");
  const [sounds, setSounds] = useState("on");
  const [gameResult, setGameResult] = useState("");

  const [answer, setAnswer] = useState(
    language === "is"
      ? prettyUpperWordList[
          Math.floor(Math.random() * prettyUpperWordList.length)
        ]
      : englishUpperWordList[
          Math.floor(Math.random() * englishUpperWordList.length)
        ]
  );

  /*Sounds*/
  const [playbackRate, setPlaybackRate] = useState(0.8);
  const [play] = useSound(pop, {
    playbackRate,
    volume: sounds === "on" ? 0.5 : 0,
  });

  //Shows and hides the settings menu
  const toggleSettings = () => {
    setSettingsShown(!settingsShown);
  };

  //A function that starts a new game by initializing the game board
  const startNewGame = (language) => {
    console.log("starting a new game");
    console.log(language);
    //Starting a new game so the menu needs to be hiddens
    setGameMenuShown(false);
    //Inititalizing the game result
    setGameResult("");
    //Picks a random word as the answer for the current game
    console.log("finding a new word");
    if (language === "is") {
      setAnswer(
        prettyUpperWordList[
          Math.floor(Math.random() * prettyUpperWordList.length)
        ]
      );
    } else {
      if (language === "en") {
        setAnswer(
          englishUpperWordList[
            Math.floor(Math.random() * englishUpperWordList.length)
          ]
        );
      }
    }
    //Empty the current board
    setMatrix(
      Array.from({ length: m }, () => Array.from({ length: n }, () => ""))
    );
    //Set the current row and column to the first row and column of the new board
    setCurrentRow(0);
    setCurrentColumn(0);

    //Clean the styles
    //Maybe we don't need this if we are going to remove the dom each time
    //we show the game menu!
    /*for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 5; j++) {
        let id = getRef(`${i}-${j}`);
        //id.current.style = "";
      }
    }*/

    //Clean the keyboard
    for (var key in LetterKeys) {
      let id2 = getRef(LetterKeys[key]);
      id2.current.style = "";
    }
  };

  //Simple function that starts a new game
  const handleStartNewGame = () => {
    startNewGame(language);
  };

  //Funciton that shows the game menu after each game
  const handleGameResults = (result) => {
    setGameResult(result);
    setGameMenuShown(true);
  };

  //Functuion that changes the language and starts a new game with the current language word list
  const handleLanguageChange = (language) => {
    setLanguage(language);
    startNewGame(language);
  };

  //Function that goes through the current row and checks if the current guess is correct
  const checkIfWon = () => {
    //make the answer into an array of letters
    let answerArr = answer.split("");
    //initialize counter
    let counter = 0;
    //A way to delay the anymation for each column
    let arr = ["0", "0.2", "0.4", "0.6", "0.8"];
    //check whole row
    for (var i = 0; i < 5; i++) {
      let currLetter = matrix[currentRow][i];
      //Get the reference id of the current column
      let id = getRef(`${currentRow}-${i}`);
      //Get the reference id of the keyboard key
      var id2 = getRef(LetterKeys[currLetter]);

      //If the letter is on the right spot then colour it green
      if (currLetter === answerArr[i]) {
        id.current.style =
          styles.greenAnswer + " animation-delay:" + arr[i] + "s;";
        id2.current.style = styles.greenAnswer;
        counter++;
        //If the letter is in the word but not on the right spot
      } else if (
        currLetter !== answerArr[i] &&
        answerArr.indexOf(matrix[currentRow][i]) > -1
      ) {
        id.current.style =
          styles.yellowAnwer + " animation-delay:" + arr[i] + "s;";
        id2.current.style = styles.yellowAnwer;
        //The letter is not in the word
      } else {
        id.current.style =
          styles.redAnswer + " animation-delay:" + arr[i] + "s;";
        id2.current.style = styles.redAnswer;
      }
    }

    //the counter is 5 that means all letter are correct and the game has been won
    if (counter === 5 && currentRow <= 6) {
      setTimeout(function () {
        handleGameResults("won");
      }, 3000);
      //THis was the last row and so the game is over
    } else if (currentRow === 5 && counter < 5) {
      handleGameResults("lost");
      //Still playing so the next row is selected
    } else {
      setCurrentRow((prevRow) => prevRow + 1);
    }
  };

  //This function is called each time a letter is entered
  const handleChange = (letter) => {
    //Play a pop sound each time a key is selected
    setPlaybackRate(playbackRate);
    play();

    //Don't allow keyboard inputs while user is adjusting settings
    if (!settingsShown) {
      if (!(currentColum === 5 && letter !== "EN" && letter !== "DEL")) {
        //Login answer for development...
        console.log(answer);

        //Don't allow to press anything but enter or delete on the last column
        if (currentColum < 5 && letter === "EN") {
          var enterRefId = getRef(LetterKeys[letter]);
          enterRefId.current.style = styles.keyShake;
        }
        //User is submitting the answer
        else if (currentColum === 5 && letter === "EN") {
          //Current guess
          let currentGuess = matrix[currentRow].join("");
          //Check if guess exists in the wordList array
          if (
            language === "is" &&
            prettyUpperWordList.indexOf(currentGuess) === -1
          ) {
            alert("Orðið er ekki til í orðalistanum:(");
          } else if (
            language === "en" &&
            englishUpperWordList.indexOf(currentGuess) === -1
          ) {
            alert("The word does not exist in the word list");
          } else {
            //The word exists in the word list so check if the guess is correct
            checkIfWon();
            //starting a new row
            setCurrentColumn(() => 0);
          }
          // The user is deleting previous input
        } else if (letter === "DEL") {
          //I am not going to allow delete further than 0
          if (currentColum > 0) {
            let copy = [...matrix];
            copy[currentRow][currentColum - 1] = "";
            setCurrentColumn(currentColum - 1);
            setMatrix(copy);
            let currentColumnRefId = getRef(
              `${currentRow}-${currentColum - 1}`
            );
            if (currentColumnRefId.current !== null) {
              currentColumnRefId.current.style = "";
            }
          } else if (currentColum === 0) {
            let copy = [...matrix];
            copy[currentRow][currentColum] = "";
            setCurrentColumn(0);
            setMatrix(copy);
            let firstColumnRefId = getRef(`${currentRow}-${currentColum}`);
            if (firstColumnRefId.current !== null) {
              firstColumnRefId.current.style = "";
            }
          }
        } else {
          let copy = [...matrix];
          copy[currentRow][currentColum] = letter;
          setMatrix(copy);
          let currentColumnRefId = getRef(`${currentRow}-${currentColum}`);
          if (currentColumnRefId.current !== null) {
            currentColumnRefId.current.style = styles.letterPopIn;
          }
          //new column
          setCurrentColumn((prevColumn) => prevColumn + 1);
        }
      }
    }
  };

  /*Props*/
  let settingsProps = {
    settingsShown,
    language,
    setLanguage,
    level,
    setLevel,
    sounds,
    setSounds,
  };

  let headerProps = {
    sounds,
  };

  let gameMenuProps = {
    settingsShown,
    answer,
    gameResult,
    language,
  };

  return (
    <>
      <div className="App">
        <Header onSettingsClicked={toggleSettings} {...headerProps} />
        <div className="card-container">
          {gameMenuShown && (
            <GameMenu {...gameMenuProps} onStartNewGame={handleStartNewGame} />
          )}
          {!gameMenuShown && (
            <div
              className={settingsShown ? "card-item hide" : "card-item show"}
            >
              {Object.keys(matrix).map((keyOuter) => {
                return Object.keys(matrix[keyOuter]).map((keyInner) => {
                  return (
                    <Card
                      key={`${keyInner}-${keyOuter}`}
                      innerRef={setRef(`${keyOuter}-${keyInner}`)}
                      letter={matrix[keyOuter][keyInner]}
                    />
                  );
                });
              })}
            </div>
          )}
          {settingsShown && (
            <SettingsMenu
              {...settingsProps}
              onLanguageChange={handleLanguageChange}
            />
          )}

          <Keyboard onChange={handleChange} />
        </div>
      </div>
    </>
  );
}

export default App;
