import React, { FC } from "react";
import styles from "../../styles/Button.module.css";

interface ButtonProps {
  fullWidth?: boolean;
  label: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ fullWidth, label, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
