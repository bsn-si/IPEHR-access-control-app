import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import useIsMobile from "../../hooks/useIsMobile";
import Burger from "../icons/Burger";
import Ipehr from "../icons/Ipehr";
import AddIcon from "../icons/AddIcon";
import styles from "../../styles/Header.module.scss";
import ChevronLeft from "../icons/ChevronLeft";

interface HeaderProps {
  mobileTitle: string;
  showBackBtn: boolean;
  showAddBtn?: boolean;
  onAddIconClick: () => void;
  onBackBtnClick?: () => void;
}

const Header: FC<HeaderProps> = ({
  mobileTitle,
  showBackBtn = false,
  showAddBtn = true,
  onAddIconClick,
  onBackBtnClick,
}) => {
  const [mobile, setMobile] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  return (
    <>
      {!mobile && (
        <div className={`header ${styles.header}`}>
          <div className="logo">
            <Ipehr />
          </div>
          <div className={styles["header-nav"]}>
            <Link href="/doctors">Doctors</Link>
            <Link href="/documents">Documents</Link>
          </div>
        </div>
      )}
      {mobile && (
        <div className="mobileHeader">
          {!showBackBtn && <Burger />}
          {showBackBtn && (
            <div onClick={onBackBtnClick}>
              <ChevronLeft />
            </div>
          )}
          <h4>{mobileTitle}</h4>
          <div onClick={onAddIconClick}>
            {!showBackBtn && showAddBtn && <AddIcon />}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
