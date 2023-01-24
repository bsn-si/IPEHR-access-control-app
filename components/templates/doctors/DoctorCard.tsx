import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "../../../models/User";
import { GetUser } from "../../../requests/User";
import styles from "../../../styles/Doctors.module.scss";
import SpinnerGif from "../../../assets/images/spinner.gif";

interface DoctorCardProps {
  userId: string;
  currentUserId: string;
  accessToken: string;
  onClick: (user: User) => void;
}

const DoctorCard: FC<DoctorCardProps> = ({
  userId,
  accessToken,
  currentUserId,
  onClick,
}) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    GetUser(userId.replace(/\0/g, ""), accessToken, currentUserId).then(
      (user) => setUser(user || undefined)
    );
  }, [userId]);
  return (
    <>
      {user && (
        <div
          className={styles.doctorCard}
          onClick={() => (user ? onClick(user) : null)}
        >
          <div
            className={styles.doctorPreview}
            style={{ backgroundImage: `url(${user?.pictureURL})` }}
          />
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
