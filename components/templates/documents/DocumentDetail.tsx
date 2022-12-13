import React, { FC, useState, useEffect } from "react";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Documents.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";

const DocumentDetail: FC<{
  document: any;
  onClose: () => void;
}> = ({ onClose, document }) => {
  const [mobile, setMobile] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);
  return !mobile ? (
    <Dialog onClose={onClose}>
      <div className={`flex column ${styles.documentDetail}`}>
        <h4>{document.title}</h4>
        <span>{document.doctor}</span>
        <p>{document.report}</p>
        <span>{document.created}</span>
      </div>
    </Dialog>
  ) : (
    <div className={styles.documentDetailMobile}>
      <div className="flex column">
        <h4>{document.title}</h4>
        <span>{document.doctor}</span>
        <p>{document.report}</p>
        <span>{document.created}</span>
      </div>
    </div>
  );
};

export default DocumentDetail;
