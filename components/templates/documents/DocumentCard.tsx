import React, { FC } from "react";
import styles from "../../../styles/Documents.module.css";
import Document from "../../icons/Document";

const DocumentCard: FC<{ doc: any; onClick: () => void }> = ({
  doc,
  onClick,
}) => {
  return (
    <div className={styles.documentCard} onClick={onClick}>
      <Document />
      <div className="flex column">
        <h4>{doc.title}</h4>
        <span>{doc.subTitle}</span>
        <span>{doc.created}</span>
      </div>
    </div>
  );
};

export default DocumentCard;
