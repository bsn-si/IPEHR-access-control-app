import { useState, useEffect } from "react";
import { getCsrfToken, useSession } from "next-auth/react";
import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import styles from "../styles/Documents.module.scss";
import Header from "../components/Header/Header";
import DocumentCard from "../components/templates/documents/DocumentCard";
import DocumentDetail from "../components/templates/documents/DocumentDetail";
import useIsMobile from "../hooks/useIsMobile";
import MobileNav from "../components/templates/nav/MobileNav";
import { Composition } from "../models/Composition";
import { User } from "../models/User";
import { GetUser } from "../requests/User";
import { GetCompositions } from "../requests/Compositions";

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
      // csrfToken: await getCsrfToken(context),
      session,
    },
  };
}

// const documents = [
//   {
//     id: 1,
//     title: "Pelvic Ultrasound",
//     subTitle: "Extract from the medical record",
//     created: "03.11.2022",
//     doctor: "Dr. Agnes Jones",
//     report: `Dermatology is a visual specialty. Thanks to telecommunication advances, it’s now possible for your dermatologist to see you remotely and still come up with an accurate diagnosis.

//     During your session, your BHSkin Dermatology specialist will give you their undivided attention. They will first review your personal information and confirm vital parts of your medical history.
//     They will then ask further questions about the chief reason that brought you to the clinic.`,
//   },
//   {
//     id: 2,
//     title: "Analysis",
//     doctor: "Dr. Agnes Jones",
//     subTitle: "DNA diagnostics of viral infections",
//     created: "18.10.2022",
//     report: `Dermatology is a visual specialty. Thanks to telecommunication advances, it’s now possible for your dermatologist to see you remotely and still come up with an accurate diagnosis.

//     During your session, your BHSkin Dermatology specialist will give you their undivided attention. They will first review your personal information and confirm vital parts of your medical history.
//     They will then ask further questions about the chief reason that brought you to the clinic.`,
//   },
//   {
//     id: 3,
//     title: "Dermatological report",
//     doctor: "Dr. Agnes Jones",
//     subTitle: "Extract from the medical record",
//     created: "04.10.2022",
//     report: `Dermatology is a visual specialty. Thanks to telecommunication advances, it’s now possible for your dermatologist to see you remotely and still come up with an accurate diagnosis.

//     During your session, your BHSkin Dermatology specialist will give you their undivided attention. They will first review your personal information and confirm vital parts of your medical history.
//     They will then ask further questions about the chief reason that brought you to the clinic.`,
//   },
// ];

export default function Documents() {
  const [detailModal, setDetailModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [compositions, setCompositions] = useState<Composition[]>();
  const [user, setUser] = useState<User>();

  const { data: session, status } = useSession();

  const { isMobile } = useIsMobile();

  const selectDocument = (document: any) => {
    setSelectedDoc(document);
    setDetailModal(true);
  };

  const handleBack = () => {
    setDetailModal(false);
  };

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  useEffect(() => {
    if (session?.user?.name) {
      GetUser(
        session.user.name,
        (session as any).accessToken,
        session.user.name
      ).then((user) => setUser(user || undefined));
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      GetCompositions(
        user.userID,
        (session as any).accessToken,
        user.ehrID
      ).then((compositions) => {
        console.log(compositions);
        setCompositions(compositions);
      });
    }
  }, [user]);

  return (
    <>
      <Header
        mobileTitle={detailModal ? "Documents Info" : "Documents"}
        onAddIconClick={() => setDetailModal(true)}
        showBackBtn={detailModal}
        onBackBtnClick={handleBack}
        showAddBtn={false}
      />
      <div className={styles.content}>
        {/* {compositions &&
          compositions.map((doc) => (
            <DocumentCard
              doc={doc}
              key={doc.uid}
              onClick={() => selectDocument(doc)}
            />
          ))} */}
      </div>
      {detailModal && (
        <DocumentDetail
          document={selectedDoc}
          onClose={() => setDetailModal(false)}
        />
      )}
      {mobile && <MobileNav />}
    </>
  );
}
