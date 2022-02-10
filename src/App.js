import React, { useState, useRef } from "react";
import Card from "./Components/Card.js";
import Keyboard from "./Components/Keyboard.js";
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
  const [currentColum, setCurrentColumn] = useState(0);
  const [getRef, setRef] = useDynamicRefs();
  //const [wordList, SetwordList] = useState([prettyWordList]);

  const [answer, setAnswer] = useState(
    prettyUpperWordList[Math.floor(Math.random() * prettyUpperWordList.length)]
  );

  const startNewGame = () => {
    setAnswer(
      prettyUpperWordList[
        Math.floor(Math.random() * prettyUpperWordList.length)
      ]
    );
    setMatrix(
      Array.from({ length: m }, () => Array.from({ length: n }, () => ""))
    );
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
    let arr = ["0.4", "0.8", "1.2", "1.6", "2"];
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

    if (counter === 5 && currentRow <= 6) {
      setTimeout(function () {
        alert("Vá geggjað nice! Þú vannst! Til hamingju með að vera þú!");
        // startNewGame();
      }, 3000);
    } else if (currentRow === 5 && counter < 5) {
      alert("Orðið var: " + answer);
      startNewGame();
    } else {
      setCurrentRow((prevRow) => prevRow + 1);
    }
  };

  const handleChange = (letter) => {
    console.log(answer);
    var id2 = getRef(LetterKeys[letter]);
    if (currentColum === 5 && letter === "EN") {
      //Current guess
      let currentGuess = matrix[currentRow].join("");
      //Check if guess exists in the wordList array
      if (prettyUpperWordList.indexOf(currentGuess) === -1) {
        alert("Orðið er ekki til í orðalistanum:(");
      } else {
        checkIfWon();
        //starting a new row
        setCurrentColumn(() => 0);
      }
    } else if (
      (currentColum === 5 && letter !== "EN" && letter !== "DEL") ||
      (currentColum < 5 && letter === "EN")
    ) {
      id2.current.style = "animation: shake 0.82s";
      setTimeout(function () {
        id2.current.style = "";
      }, 1000);
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
    <div className="App">
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
  );
}

export default App;
