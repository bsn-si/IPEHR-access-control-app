import React, { FC, useState } from "react";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Documents.module.css";

const DocumentDetail: FC<{
  document: any;
  onClose: () => void;
}> = ({ onClose, document }) => {
  return (
    <Dialog onClose={onClose}>
      <div className={`flex column ${styles.documentDetail}`}>
        <h4>{document.title}</h4>
        <span>{document.doctor}</span>
        <p>{document.report}</p>
        <span>{document.created}</span>
      </div>
    </Dialog>
  );
};

export default DocumentDetail;
