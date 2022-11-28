import React, { FC, useState } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import Input from "../../ui/Input/Input";
import styles from "../../../styles/Doctors.module.css";

const AddDoctorDialog: FC<{
  onClose: () => void;
  onSuccess: (doctor: any) => void;
}> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  return (
    <Dialog onClose={onClose}>
      {step === 1 && (
        <div
          className={`flex column justify-center align-center ${styles["dialog-content"]}`}
        >
          <h4 className={styles["dialog-header"]}>Enter Doctor Code</h4>
          <p className={styles["dialog-text"]}>
            To add a new doctor please enter Doctor code and confirm addition.
          </p>
          <Input label="PIN" />
          <Button label="ADD DOCTOR" onClick={() => setStep(2)} />
        </div>
      )}
      {step === 2 && (
        <div className={`flex`}>
          <div className={styles.doctorImage} />
          <div className={`flex column justify-center ${styles.doctorInfo}`}>
            <h4 className={styles["dialog-header"]}>Dr. Agnes Jones</h4>
            <span className={styles.doctorSubTitle}>
              Cleveland Clinic, 33 Grosvenor Pl, London
            </span>
            <p className={styles.doctorText}>
              Primary clinical interests are Thyroid Cancer, Thyroid Nodules,
              Thyroid Goitres, Primary Hyperparathyroidism, Adrenal Tumours
            </p>
            <span>Speaks English, Chinese</span>
            <Button
              label="ADD DOCTOR"
              onClick={() =>
                onSuccess({
                  name: "Dr. Jones",
                  address: "Cleveland Clinic, 33 Grosvenor Pl, London",
                  description: `Primary clinical interests are Thyroid Cancer, Thyroid Nodules,
                  Thyroid Goitres, Primary Hyperparathyroidism, Adrenal Tumours`,
                  languages: ["English", "Chinese"],
                })
              }
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default AddDoctorDialog;
