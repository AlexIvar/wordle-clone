import React from "react";
import "../Styles/Card.css";

export const Card = (props) => {
  return (
    <div id="letter" ref={props.innerRef} value={props.letter}>
      {props.letter}
      </div>
  );
};

export default Card;
