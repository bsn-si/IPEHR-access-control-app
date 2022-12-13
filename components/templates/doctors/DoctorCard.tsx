import React, { FC } from "react";
import styles from "../../../styles/Doctors.module.scss";

interface DoctorCardProps {
  name: string;
  address: string;
  image?: string;
  onClick: () => void;
}

const DoctorCard: FC<DoctorCardProps> = ({ name, address, image, onClick }) => {
  return (
    <div
      className={`flex column justify-center ${styles.doctorCard}`}
      onClick={onClick}
    >
      <div className={styles.doctorPreview} />
      <div className={styles.doctorCardHeader}>{name}</div>
      <span className={styles.doctorSubTitle}>{address}</span>
    </div>
  );
};

export default DoctorCard;
