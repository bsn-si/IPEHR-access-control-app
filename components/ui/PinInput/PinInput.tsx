import React, { FC, useState, useEffect } from "react";
import styles from "./PinInput.module.scss";

const PinInput: FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [value, setValue] = useState("XXXX-XXXX");
  const [currentSymbol, setCurrentSymbol] = useState(0);
  const handleKeyDown = (e: any) => {
    let sym = currentSymbol === 4 ? 5 : currentSymbol;
    const newArr = Array.from(value);
    if (!isNaN(Number(e.key)) && currentSymbol < 9) {
      newArr.splice(sym, 1, String(e.key));
      setCurrentSymbol(
        currentSymbol === 4
          ? currentSymbol + 2
          : currentSymbol === 8
          ? currentSymbol
          : currentSymbol + 1
      );
    }
    if (e.key === "Backspace") {
      newArr.splice(sym, 1, "X");
      setCurrentSymbol(
        currentSymbol === 5
          ? currentSymbol - 2
          : currentSymbol === 0
          ? currentSymbol
          : currentSymbol - 1
      );
    }
    setValue(newArr.join(""));
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleOnChange = (e: any) => {
    return null;
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleOnChange}
      className={styles.input}
      onKeyDown={handleKeyDown}
      maxLength={9}
    />
  );
};

export default PinInput;
