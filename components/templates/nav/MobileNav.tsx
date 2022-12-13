import { useRouter } from "next/router";
import { FC } from "react";
import DocumentNav from "../../icons/DocumentNav";
import Nurse from "../../icons/Nurse";
import styles from "./MobileNav.module.scss";

const MobileNav: FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.pathname === "/doctors"
      ? router.push("/documents")
      : router.push("/doctors");
  };
  return (
    <div className="mobileNav flex justify-between">
      <div
        className={`flex column justify-center align-center ${
          router.pathname === "/doctors" ? styles.active : ""
        }`}
        onClick={handleClick}
      >
        <Nurse />
        <span>Doctors</span>
      </div>
      <div
        className={`flex column justify-center align-center ${
          router.pathname === "/documents" ? styles.active : ""
        }`}
        onClick={handleClick}
      >
        <DocumentNav />
        <span>Documents</span>
      </div>
    </div>
  );
};

export default MobileNav;
