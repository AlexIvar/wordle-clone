import React, { useEffect, useState } from "react";
import useDynamicRefs from "use-dynamic-refs";
import { FiDelete } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import "./Keyboard.css";

export const Keyboard = (props) => {
  const [getRef, setRef] = useDynamicRefs();
  const [comma, setComma] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();
      /*console.log(e.target);
      console.log(e.keyCode);
      console.log(e.code);
      if (e.code === "Quote" && e.code === "KeyA") {
        console.log("fire!");
      }*/
      let id = 0;
      if (comma === true) {
        id = getRef(22265);
      } else {
        id = getRef(e.keyCode);
      }
      id.current.click();
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="key-container">
      <div className="key-item">
        <div ref={setRef(65)} onClick={() => props.onChange("A")}>
          A
        </div>
        <div ref={setRef(22265)} onClick={() => props.onChange("Á")}>
          Á
        </div>
        <div ref={setRef(66)} onClick={() => props.onChange("B")}>
          B
        </div>
        <div ref={setRef(68)} onClick={() => props.onChange("D")}>
          D
        </div>
        <div ref={setRef(69)} onClick={() => props.onChange("E")}>
          E
        </div>
        <div ref={setRef(22269)} onClick={() => props.onChange("É")}>
          É
        </div>
        <div ref={setRef(70)} onClick={() => props.onChange("F")}>
          F
        </div>
        <div ref={setRef(71)} onClick={() => props.onChange("G")}>
          G
        </div>
        <div ref={setRef(72)} onClick={() => props.onChange("H")}>
          H
        </div>
        <div ref={setRef(73)} onClick={() => props.onChange("I")}>
          I
        </div>
        <div ref={setRef(8)} onClick={() => props.onChange("DEL")}>
          <FiDelete />
        </div>
        <div ref={setRef(22273)} onClick={() => props.onChange("Í")}>
          Í
        </div>
        <div ref={setRef(74)} onClick={() => props.onChange("J")}>
          J
        </div>
        <div ref={setRef(75)} onClick={() => props.onChange("K")}>
          K
        </div>
        <div ref={setRef(76)} onClick={() => props.onChange("L")}>
          L
        </div>
        <div ref={setRef(77)} onClick={() => props.onChange("M")}>
          M
        </div>
        <div ref={setRef(78)} onClick={() => props.onChange("N")}>
          N
        </div>
        <div ref={setRef(79)} onClick={() => props.onChange("O")}>
          O
        </div>
        <div ref={setRef(22279)} onClick={() => props.onChange("Ó")}>
          Ó
        </div>
        <div ref={setRef(80)} onClick={() => props.onChange("P")}>
          P
        </div>
        <div ref={setRef(82)} onClick={() => props.onChange("R")}>
          R
        </div>
        <div ref={setRef(83)} onClick={() => props.onChange("S")}>
          S
        </div>
        <div ref={setRef(84)} onClick={() => props.onChange("T")}>
          T
        </div>
        <div ref={setRef(85)} onClick={() => props.onChange("U")}>
          U
        </div>
        <div ref={setRef(22285)} onClick={() => props.onChange("Ú")}>
          Ú
        </div>
        <div ref={setRef(86)} onClick={() => props.onChange("V")}>
          V
        </div>
        <div ref={setRef(88)} onClick={() => props.onChange("X")}>
          X
        </div>
        <div ref={setRef(89)} onClick={() => props.onChange("Y")}>
          Y
        </div>
        <div ref={setRef(22289)} onClick={() => props.onChange("Ý")}>
          Ý
        </div>
        <div ref={setRef(191)} onClick={() => props.onChange("Þ")}>
          Þ
        </div>
        <div ref={setRef(186)} onClick={() => props.onChange("Æ")}>
          Æ
        </div>
        <div ref={setRef(219)} onClick={() => props.onChange("Ð")}>
          Ð
        </div>
        <div ref={setRef(189)} onClick={() => props.onChange("Ö")}>
          Ö
        </div>
        <div ref={setRef(13)} onClick={() => props.onChange("EN")}>
          <AiOutlineEnter />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
