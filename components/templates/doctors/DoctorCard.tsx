import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "../../../models/User";
import { GetUser } from "../../../requests/User";
import styles from "../../../styles/Doctors.module.scss";
import SpinnerGif from "../../../assets/images/spinner.gif";

interface DoctorCardProps {
  userId: string;
  onClick: (user: User) => void;
}

const DoctorCard: FC<DoctorCardProps> = ({ userId, onClick }) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    GetUser(userId.replace(/\0/g, "")).then((user) =>
      setUser(user || undefined)
    );
  }, [userId]);
  return (
    <>
      {user && (
        <div
          className={styles.doctorCard}
          onClick={() => (user ? onClick(user) : null)}
        >
          <div className={styles.doctorPreview} />
          <div>
            <div className={styles.doctorCardHeader}>{user?.name}</div>
            <span className={styles.doctorSubTitle}>{user?.address}</span>
          </div>
        </div>
      )}
      {!user && (
        <div
          className={`flex justify-center align-center ${styles.doctorCard}`}
        >
          <Image src={SpinnerGif} width={24} height={24} alt="" />
        </div>
      )}
    </>
  );
};

export default DoctorCard;
