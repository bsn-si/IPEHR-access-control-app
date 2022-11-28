import { useState } from "react";
import { getCsrfToken } from "next-auth/react";
import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Ipehr from "../components/icons/Ipehr";
import styles from "../styles/Documents.module.css";
import Link from "next/link";
import DocumentCard from "../components/templates/documents/DocumentCard";
import DocumentDetail from "../components/templates/documents/DocumentDetail";

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

export default function Documents() {
  const [detailModal, setDetailModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const selectDocument = (document: any) => {
    setSelectedDoc(document);
    setDetailModal(true);
  };
  const documents = [
    {
      id: 1,
      title: "Pelvic Ultrasound",
      subTitle: "Extract from the medical record",
      created: "03.11.2022",
      doctor: "Dr. Agnes Jones",
      report: `Dermatology is a visual specialty. Thanks to telecommunication advances, it’s now possible for your dermatologist to see you remotely and still come up with an accurate diagnosis.

      During your session, your BHSkin Dermatology specialist will give you their undivided attention. They will first review your personal information and confirm vital parts of your medical history.
      They will then ask further questions about the chief reason that brought you to the clinic.`,
    },
    {
      id: 2,
      title: "Analysis",
      doctor: "Dr. Agnes Jones",
      subTitle: "DNA diagnostics of viral infections",
      created: "18.10.2022",
      report: `Dermatology is a visual specialty. Thanks to telecommunication advances, it’s now possible for your dermatologist to see you remotely and still come up with an accurate diagnosis.

      During your session, your BHSkin Dermatology specialist will give you their undivided attention. They will first review your personal information and confirm vital parts of your medical history.
      They will then ask further questions about the chief reason that brought you to the clinic.`,
    },
    {
      id: 3,
      title: "Dermatological report",
      doctor: "Dr. Agnes Jones",
      subTitle: "Extract from the medical record",
      created: "04.10.2022",
      report: `Dermatology is a visual specialty. Thanks to telecommunication advances, it’s now possible for your dermatologist to see you remotely and still come up with an accurate diagnosis.

      During your session, your BHSkin Dermatology specialist will give you their undivided attention. They will first review your personal information and confirm vital parts of your medical history.
      They will then ask further questions about the chief reason that brought you to the clinic.`,
    },
  ];
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
        {documents.map((doc) => (
          <DocumentCard
            doc={doc}
            key={doc.id}
            onClick={() => selectDocument(doc)}
          />
        ))}
      </div>
      {detailModal && (
        <DocumentDetail
          document={selectedDoc}
          onClose={() => setDetailModal(false)}
        />
      )}
    </>
  );
}
