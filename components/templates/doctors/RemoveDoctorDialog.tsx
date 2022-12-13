import React, { FC, useState } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Doctors.module.scss";

const AddDoctorDialog: FC<{
  doctor: any;
  onClose: () => void;
  onSuccess: (doctor: any) => void;
}> = ({ doctor, onClose, onSuccess }) => {
  return (
    <Dialog onClose={onClose}>
      <div className={`flex`}>
        <div className={styles.doctorImage} />
        <div className={`flex column justify-center ${styles.doctorInfo}`}>
          <h4 className={styles["dialog-header"]}>{doctor.name}</h4>
          <span className={styles.doctorSubTitle}>{doctor.address}</span>
          <p className={styles.doctorText}>{doctor.description}</p>
          <span>Speaks {doctor.languages.join(", ")}</span>
          <Button label="REMOVE DOCTOR" onClick={() => onSuccess(doctor)} />
        </div>
      </div>
    </Dialog>
  );
};

export default AddDoctorDialog;
