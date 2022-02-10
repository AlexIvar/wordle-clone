import React, { useState, useRef } from "react";
import Card from "./Components/Card.js";
import Keyboard from "./Components/Keyboard.js";
import Settings from "./Components/Settings.js";
import useDynamicRefs from "use-dynamic-refs";
import { LetterKeys } from "./Data/LetterKeys.js";
import { prettyUpperWordList } from "./Data/WordsUpper";
import "./App.css";

function App() {
  const n = 5;
  const m = 6;
  let green =
    "animation: push 0.4s backwards linear; background-color:#19AB86;";
  let yellow =
    "animation: push 0.4s backwards linear; background-color:#b5b500;";
  let red =
    "animation: push 0.4s backwards linear; background-color:rgb(255 44 44);";

  const [matrix, setMatrix] = useState(
    Array.from({ length: m }, () => Array.from({ length: n }, () => ""))
  );

  //Current row of guesses
  const [currentRow, setCurrentRow] = useState(0);
  //Current letter column
  const [currentColum, setCurrentColumn] = useState(0);
  const [getRef, setRef] = useDynamicRefs();
  //const [wordList, SetwordList] = useState([prettyWordList]);

  const [answer, setAnswer] = useState(
    prettyUpperWordList[Math.floor(Math.random() * prettyUpperWordList.length)]
  );

  //A function that starts a new game by initializing the game board
  const startNewGame = () => {
    //Picks a random word as the answer for the current game
    setAnswer(
      prettyUpperWordList[
        Math.floor(Math.random() * prettyUpperWordList.length)
      ]
    );
    //Empty the current board
    setMatrix(
      Array.from({ length: m }, () => Array.from({ length: n }, () => ""))
    );
    //Set the current row and column to the first row and column of the new board
    setCurrentRow(0);
    setCurrentColumn(0);

    //Clean the styles
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 5; j++) {
        let id = getRef(`${i}-${j}`);
        id.current.style = "";
      }
    }
    //Clean the keyboard
    for (var key in LetterKeys) {
      let id2 = getRef(LetterKeys[key]);
      id2.current.style = "";
    }
  };

  const checkIfWon = () => {
    //make the answer into an array of letters
    let answerArr = answer.split("");
    //initialize counter
    let counter = 0;
    //A way to delay the anymation for each column
    let arr = ["0.3", "0.7", "1.1", "1.5", "1.9"];
    //check whole row
    for (var i = 0; i < 5; i++) {
      let currLetter = matrix[currentRow][i];
      //Get the reference id of the current column
      let id = getRef(`${currentRow}-${i}`);
      //Get the reference id of the keyboard key
      var id2 = getRef(LetterKeys[currLetter]);

      id.current.removeAttribute("style");
      id2.current.removeAttribute("style");

      //If the letter is on the right spot then colour it green
      if (currLetter === answerArr[i]) {
        id.current.style = green + " animation-delay:" + arr[i] + "s;";
        id2.current.style = green;
        counter++;
        //If the letter is in the word but not on the right spot
      } else if (
        currLetter !== answerArr[i] &&
        answerArr.indexOf(matrix[currentRow][i]) > -1
      ) {
        id.current.style = yellow + " animation-delay:" + arr[i] + "s;";
        id2.current.style = yellow;
        //The letter is not in the word
      } else {
        id.current.style = red + " animation-delay:" + arr[i] + "s;";
        id2.current.style = red;
      }
    }

    //the counter is 5 that means all letter are correct and the game has been won
    if (counter === 5 && currentRow <= 6) {
      setTimeout(function () {
        alert("Vá geggjað nice! Þú vannst! Til hamingju með að vera þú!");
        //startNewGame();
      }, 3000);
      //THis was the last row and so the game is over
    } else if (currentRow === 5 && counter < 5) {
      alert("Orðið var: " + answer);
      startNewGame();
      //Still playing so the next row is selected
    } else {
      setCurrentRow((prevRow) => prevRow + 1);
    }
  };

  //This function is called each time a letter is entered
  const handleChange = (letter) => {
    //Login answer for development...
    console.log(answer);
    //Getting the reference to the selected key on the keyboard
    var id2 = getRef(LetterKeys[letter]);
    if (currentColum === 5 && letter === "EN") {
      //Current guess
      let currentGuess = matrix[currentRow].join("");
      //Check if guess exists in the wordList array
      if (prettyUpperWordList.indexOf(currentGuess) === -1) {
        alert("Orðið er ekki til í orðalistanum:(");
      } else {
        //The word exists in the word list so check if the guess is correct
        checkIfWon();
        //starting a new row
        setCurrentColumn(() => 0);
      }
      //If user is trying to sumbit an uncomplete answer
    } else if (
      (currentColum === 5 && letter !== "EN" && letter !== "DEL") ||
      (currentColum < 5 && letter === "EN")
    ) {
      id2.current.style = "animation: shake 0.82s";
      setTimeout(function () {
        id2.current.style = "";
      }, 1000);
      // The user is deleting previous input
    } else if (letter === "DEL") {
      //I am not going to allow delete further than 0
      if (currentColum !== 0) {
        let copy = [...matrix];
        copy[currentRow][currentColum - 1] = "";
        setCurrentColumn((prevColumn) => prevColumn - 1);
        setMatrix(copy);
        let id3 = getRef(`${currentRow}-${currentColum - 1}`);
        id3.current.style = "";
      }
    } else {
      let copy = [...matrix];
      copy[currentRow][currentColum] = letter;
      setMatrix(copy);
      let id3 = getRef(`${currentRow}-${currentColum}`);
      id3.current.style =
        "animation: pop 0.1s linear 1;  border: 3px solid #ac98d39e;";
      //new column
      setCurrentColumn((prevColumn) => prevColumn + 1);
    }
  };

  return (
    <>
      <div className="App">
      <Settings />
        <div className="card-container">
          <div className="card-item">
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
          <Keyboard onChange={handleChange} />
        </div>
      </div>
    </>
  );
}

export default App;
