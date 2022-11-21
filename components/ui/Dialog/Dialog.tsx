import React, { FC } from "react";
import CloseIcon from "../../icons/CloseIcon";
import styles from "./Dialog.module.css";

interface DialogProps {
  onClose: () => void;
}

export const Dialog: FC<React.PropsWithChildren<DialogProps>> = ({
  onClose,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.closeIcon} onClick={onClose}>
        <CloseIcon />
      </div>
      {children}
    </div>
  );
};
