import { useState } from "react";
import { getCsrfToken } from "next-auth/react";
import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Ipehr from "../components/icons/Ipehr";
import styles from "../styles/Doctors.module.css";
import Link from "next/link";
import AddDoctor from "../components/templates/doctors/AddDoctor";
import AddDoctorDialog from "../components/templates/doctors/AddDoctorDialog";
import RemoveDoctorDialog from "../components/templates/doctors/RemoveDoctorDialog";
import DoctorCard from "../components/templates/doctors/DoctorCard";

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
  const [removeModal, setRemoveModal] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const addDoctor = (doctor: any) => {
    let newDoctors = doctors.slice();
    newDoctors.push({ ...doctor, id: doctors.length + 1 });
    setDoctors(newDoctors);
    setAddModal(false);
  };

  const selectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setRemoveModal(true);
  };

  const removeDoctor = (doctor: any) => {
    const fIndex = doctors.findIndex((doc) => doc.id === doctor.id);
    if (fIndex !== -1) {
      const newDoctors = doctors.slice();
      newDoctors.splice(fIndex, 1);
      setDoctors(newDoctors);
    }
    setRemoveModal(false);
  };
  return (
    <>
      <div className={`header ${styles.header}`}>
        <div className="logo">
          <Ipehr />
        </div>
        <div className={styles["header-nav"]}>
          <Link href="/doctors">Doctors</Link>
          <Link href="/documents">Documents</Link>
        </div>
      </div>
      <div className={styles.content}>
        {doctors.map((doctor) => (
          <DoctorCard
            name={doctor.name}
            address={doctor.address}
            key={doctor.id}
            onClick={() => selectDoctor(doctor)}
          />
        ))}
        <AddDoctor onClick={() => setAddModal(true)} />
      </div>
      {addModal && (
        <AddDoctorDialog
          onClose={() => setAddModal(false)}
          onSuccess={(doctor) => addDoctor(doctor)}
        />
      )}
      {removeModal && (
        <RemoveDoctorDialog
          onClose={() => setRemoveModal(false)}
          doctor={selectedDoctor}
          onSuccess={(doctor) => removeDoctor(doctor)}
        />
      )}
    </>
  );
}
