import { useState } from "react";
import { getCsrfToken } from "next-auth/react";
import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Ipehr from "../components/icons/Ipehr";
import styles from "../styles/Doctors.module.css";
import Link from "next/link";
import AddDoctor from "../components/templates/doctors/AddDoctor";
import { Dialog } from "../components/ui/Dialog/Dialog";
import AddDoctorDialog from "../components/templates/doctors/AddDoctorDialog";

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  );
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      session,
    },
  };
}

export default function Doctors() {
  const [addModal, setAddModal] = useState(false);
  return (
    <>
      <div className={`header ${styles.header}`}>
        <div className="logo">
          <Ipehr />
        </div>
        <div className={styles["header-nav"]}>
          <Link href="/doctors">Doctors</Link>
          <Link href="/doctors">Documents</Link>
        </div>
      </div>
      <div className={styles.content}>
        <AddDoctor onClick={() => setAddModal(true)} />
      </div>
      {addModal && <AddDoctorDialog onClose={() => setAddModal(false)} />}
    </>
  );
}
