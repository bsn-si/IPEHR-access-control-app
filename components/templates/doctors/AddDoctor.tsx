import React, { FC } from "react";
import AddIcon from "../../icons/AddIcon";
import styles from "../../../styles/Doctors.module.scss";

const AddDoctor: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      className={`${styles["add-doctor"]} flex column align-center justify-center cursor-pointer`}
      onClick={onClick}
    >
      <div className="mb-md">
        <AddIcon />
      </div>
      <span>Click here to add a doctor.</span>
    </div>
  );
};

export default AddDoctor;
