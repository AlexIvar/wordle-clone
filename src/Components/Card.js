import React, { useState, useEffect } from "react";
import "./Card.css";

export const Card = (props) => {
  return (
    <div id="letter" ref={props.innerRef} value={props.letter}>
      <p>{props.letter}</p>
    </div>
  );
};

export default Card;
