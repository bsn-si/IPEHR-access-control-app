import React, { FC, useRef, lazy, Suspense, memo } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  type?: "text" | "password" | "number";
  Icon?: React.FC;
  onInput?: (value: any) => void;
}

const Input: FC<InputProps> = ({ type = "text", label, Icon, onInput }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <label className={`${styles.container} col`}>
      <div className="col h100">
        <div className="flex relative h100">
          {Icon && (
            <div className={styles.iconWrap}>
              <Icon />
            </div>
          )}
          <div className="flex col">
            <input
              onChange={(event) => onInput && onInput(event.target.value)}
              type={type}
              className={`${styles.native} ${
                (ref?.current?.value.length && styles.hasValue) || ""
              }`}
              ref={ref}
            />
            <div className={`${styles.label} absolute`}>{label}</div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default memo(Input);
