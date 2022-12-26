import { useEffect, useState } from "react";
import { getCsrfToken, useSession } from "next-auth/react";
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
import { GetUserGroups } from "../requests/UserGroup";
import { UserGroup } from "../models/UserGroup";
import { User } from "../models/User";

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
  const [selectedDoctor, setSelectedDoctor] = useState<User>();
  const { isMobile } = useIsMobile();
  const [mobile, setMobile] = useState(false);
  const [docStep, setDocStep] = useState<string>("");
  const [userGroups, setUserGroups] = useState<UserGroup[]>();
  const [doctorsGroup, setDoctorsGroup] = useState<UserGroup>();

  const { data: session, status } = useSession();

  const getGroups = () => {
    GetUserGroups(session?.user?.name || "", (session as any).accessToken).then(
      (groups) => setUserGroups(groups)
    );
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    userGroups?.find((group) => {
      if (group.name === "doctors") setDoctorsGroup(group);
    });
  }, [userGroups]);

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  const selectDoctor = (doctor: User) => {
    setDocStep("Doctor Info");
    setSelectedDoctor(doctor);
    setRemoveModal(true);
  };

  const handleBack = () => {
    setDocStep("");
    setAddModal(false);
    setRemoveModal(false);
  };

  const handleRemoved = (doctor: User) => {
    if (doctorsGroup) {
      const newDocGroup: UserGroup = { ...doctorsGroup };
      const foundIndex = newDocGroup.members.findIndex(
        (doc) => doc === doctor.userID
      );
      if (foundIndex > -1) {
        newDocGroup.members.splice(foundIndex, 1);
      }
      setDoctorsGroup(newDocGroup);
    }
    setRemoveModal(false);
    getGroups();
  };

  const handleAdded = (doctor: User) => {
    if (doctorsGroup) {
      const newDocGroup: UserGroup = { ...doctorsGroup };
      newDocGroup.members?.push(doctor.userID);
      setDoctorsGroup(newDocGroup);
    }

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
      <div
        className={
          styles.content +
          (doctorsGroup && doctorsGroup?.members.length < 1
            ? " " + styles.contentEmpty
            : "")
        }
      >
        {doctorsGroup?.members.map((doctor) => (
          <DoctorCard
            userId={doctor}
            key={doctor}
            onClick={(user) => selectDoctor(user)}
          />
        ))}
        {!mobile && <AddDoctor onClick={() => setAddModal(true)} />}
        {doctorsGroup &&
          doctorsGroup?.members?.length < 1 &&
          mobile &&
          !addModal && <span>{'Click on the "plus" to add a doctor.'}</span>}
      </div>
      {addModal && doctorsGroup && (
        <AddDoctorDialog
          onClose={() => setAddModal(false)}
          onSuccess={(doctor) => handleAdded(doctor)}
          onChangeStep={(step: string) => setDocStep(step)}
          doctorsGroup={doctorsGroup}
        />
      )}
      {removeModal && doctorsGroup && selectedDoctor && (
        <RemoveDoctorDialog
          onClose={() => setRemoveModal(false)}
          doctor={selectedDoctor}
          onSuccess={(doctor) => handleRemoved(doctor)}
          groupId={doctorsGroup.groupID}
          accessToken={(session as any).accessToken}
          userId={session?.user?.name || ""}
        />
      )}
      {mobile && <MobileNav />}
    </>
  );
}
