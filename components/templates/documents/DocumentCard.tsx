import React, { FC } from "react";
import styles from "../../../styles/Documents.module.scss";
import { formatDate } from "../../../utils/date";
import Document from "../../icons/Document";

const DocumentCard: FC<{ doc: any; onClick: () => void }> = ({
  doc,
  onClick,
}) => {
  return (
    <div className={styles.documentCard} onClick={onClick}>
      <Document />
      <div className="flex column">
        <h4>{doc.name}</h4>
        <span>{formatDate(doc.timeCreated)}</span>
      </div>
    </div>
  );
};

export default DocumentCard;
