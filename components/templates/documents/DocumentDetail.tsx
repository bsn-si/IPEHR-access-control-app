import React, { FC, useState, useEffect } from "react";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Documents.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";
import { Composition } from "../../../models/Composition";
import { formatDate } from "../../../utils/date";

const DocumentDetail: FC<{
  document: Composition;
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
        <h4>{document.name}</h4>
        <span>{formatDate(document.timeCreated)}</span>
      </div>
    </Dialog>
  ) : (
    <div className={styles.documentDetailMobile}>
      <div className="flex column">
        <h4>{document.name}</h4>
        <span>{formatDate(document.timeCreated)}</span>
      </div>
    </div>
  );
};

export default DocumentDetail;
