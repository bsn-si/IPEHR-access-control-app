import React, { FC, useState } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Doctors.module.scss";
import { RemoveUserFromGroup } from "../../../requests/UserGroup";
import { User } from "../../../models/User";

const AddDoctorDialog: FC<{
  doctor: User;
  groupId: string;
  accessToken: string;
  userId: string;
  onClose: () => void;
  onSuccess: (doctor: any) => void;
}> = ({ doctor, accessToken, groupId, userId, onClose, onSuccess }) => {
  const removeDoctor = async () => {
    const result = await RemoveUserFromGroup(
      accessToken,
      userId,
      groupId,
      doctor.userID
    );
    if (result.ok) {
      onSuccess(doctor);
    }
  };
  return (
    <Dialog onClose={onClose}>
      <div className={`flex`}>
        <div className={styles.doctorImage} />
        <div className={`flex column justify-center ${styles.doctorInfo}`}>
          <h4 className={styles["dialog-header"]}>
            {doctor.name.replace(/\0/g, "")}
          </h4>
          <span className={styles.doctorSubTitle}>{doctor.address}</span>
          <p className={styles.doctorText}>{doctor.description}</p>
          {/* <span>Speaks {doctor.languages.join(", ")}</span> */}
          <Button label="REMOVE DOCTOR" onClick={() => removeDoctor()} />
        </div>
      </div>
    </Dialog>
  );
};

export default AddDoctorDialog;
