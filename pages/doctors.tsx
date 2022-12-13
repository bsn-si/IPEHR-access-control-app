import { useEffect, useState } from "react";
import { getCsrfToken } from "next-auth/react";
import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import styles from "../styles/Doctors.module.scss";
import AddDoctor from "../components/templates/doctors/AddDoctor";
import AddDoctorDialog from "../components/templates/doctors/AddDoctorDialog";
import RemoveDoctorDialog from "../components/templates/doctors/RemoveDoctorDialog";
import DoctorCard from "../components/templates/doctors/DoctorCard";
import useIsMobile from "../hooks/useIsMobile";
import MobileNav from "../components/templates/nav/MobileNav";
import Header from "../components/Header/Header";

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
  const { isMobile } = useIsMobile();
  const [mobile, setMobile] = useState(false);
  const [docStep, setDocStep] = useState<string>("");

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

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

  const handleBack = () => {
    setDocStep("");
    setAddModal(false);
  };
  return (
    <>
      <Header
        mobileTitle={docStep || "Doctors"}
        onAddIconClick={() => setAddModal(true)}
        showBackBtn={docStep.length > 0}
        onBackBtnClick={handleBack}
      />
      <div className={styles.content}>
        {doctors.map((doctor) => (
          <DoctorCard
            name={doctor.name}
            address={doctor.address}
            key={doctor.id}
            onClick={() => selectDoctor(doctor)}
          />
        ))}
        {!mobile && <AddDoctor onClick={() => setAddModal(true)} />}
        {doctors.length < 1 && mobile && !addModal && (
          <span>{'Click on the "plus" to add a doctor.'}</span>
        )}
      </div>
      {addModal && (
        <AddDoctorDialog
          onClose={() => setAddModal(false)}
          onSuccess={(doctor) => addDoctor(doctor)}
          onChangeStep={(step: string) => setDocStep(step)}
        />
      )}
      {removeModal && (
        <RemoveDoctorDialog
          onClose={() => setRemoveModal(false)}
          doctor={selectedDoctor}
          onSuccess={(doctor) => removeDoctor(doctor)}
        />
      )}
      {mobile && <MobileNav />}
    </>
  );
}
