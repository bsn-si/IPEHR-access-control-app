import React, { FC, useRef, lazy, Suspense } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  type?: "text" | "password" | "number";
  icon?: string;
  onInput?: (value: any) => void;
}

const Input: FC<InputProps> = ({ type = "text", label, icon, onInput }) => {
  const ref = useRef<HTMLInputElement>(null);
  const DynamicIcon = lazy(() => import(`../../icons/${icon}`));
  return (
    <label className={`${styles.container} col`}>
      <div className="col">
        <div className="flex relative">
          {icon && (
            <Suspense fallback={""}>
              <div className={styles.iconWrap}>
                <DynamicIcon />
              </div>
            </Suspense>
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

export default Input;
