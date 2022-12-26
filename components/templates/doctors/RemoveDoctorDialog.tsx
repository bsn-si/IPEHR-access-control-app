import React, { FC, useState, useEffect } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Doctors.module.scss";
import { RemoveUserFromGroup } from "../../../requests/UserGroup";
import { User } from "../../../models/User";
import useIsMobile from "../../../hooks/useIsMobile";

const AddDoctorDialog: FC<{
  doctor: User;
  groupId: string;
  accessToken: string;
  userId: string;
  onClose: () => void;
  onSuccess: (doctor: User) => void;
}> = ({ doctor, accessToken, groupId, userId, onClose, onSuccess }) => {
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);
  const removeDoctor = async () => {
    setLoading(true);
    const result = await RemoveUserFromGroup(
      accessToken,
      userId,
      groupId,
      doctor.userID
    );
    if (result.ok) {
      onSuccess(doctor);
    } else {
      setLoading(false);
    }
  };

  const doctorInfo = (
    <div className={styles.doctorInfo}>
      <div className={styles.doctorImage} />
      <div className={`flex column justify-center ${styles.doctorInfoText}`}>
        <h4 className={styles["dialog-header"]}>
          {doctor.name.replace(/\0/g, "")}
        </h4>
        <span className={styles.doctorSubTitle}>{doctor.address}</span>
        <p className={styles.doctorText}>{doctor.description}</p>
        {/* <span>Speaks {doctor.languages.join(", ")}</span> */}
        <Button
          label="REMOVE DOCTOR"
          onClick={() => removeDoctor()}
          loading={loading}
        />
      </div>
    </div>
  );
  return !mobile ? (
    <Dialog onClose={onClose}>{doctorInfo}</Dialog>
  ) : (
    <div className={styles.mobileDocInfo}>{doctorInfo}</div>
  );
};

export default AddDoctorDialog;
