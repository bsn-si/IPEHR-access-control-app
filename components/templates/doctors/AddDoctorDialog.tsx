import React, { FC } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import Input from "../../ui/Input/Input";
import styles from "../../../styles/Doctors.module.css";

const AddDoctorDialog: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Dialog onClose={onClose}>
      <div
        className={`flex column justify-center align-center ${styles["dialog-content"]}`}
      >
        <h4 className={styles["dialog-header"]}>Enter Doctor Code</h4>
        <p className={styles["dialog-text"]}>
          To add a new doctor please enter Doctor code and confirm addition.
        </p>
        <Input label="PIN" />
        <Button label="ADD DOCTOR" />
      </div>
    </Dialog>
  );
};

export default AddDoctorDialog;
