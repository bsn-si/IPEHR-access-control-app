import React, { FC } from "react";
import Image from "next/image";
import styles from "../../styles/Button.module.css";
import SpinnerGif from "../../assets/images/spinner.gif";

interface ButtonProps {
  fullWidth?: boolean;
  label: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  fullWidth,
  label,
  loading = false,
  onClick,
}) => {
  const handleClick = () => {
    loading ? null : onClick ? onClick() : null;
  };
  return (
    <button className={styles.button} onClick={handleClick}>
      {!loading && label}
      {loading && <Image src={SpinnerGif} width={24} height={24} alt="" />}
    </button>
  );
};

export default Button;
