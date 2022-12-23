import React, { FC, useState, useEffect } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Doctors.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";
import PinInput from "../../ui/PinInput/PinInput";
import { useSession } from "next-auth/react";

interface DoctorInfo {
  address: string;
  code: string;
  description: string;
  name: string;
  pictureURL: string;
  role: string;
  userID: string;
}

const AddDoctorDialog: FC<{
  onClose: () => void;
  onSuccess: (doctor: any) => void;
  onChangeStep: (step: string) => void;
}> = ({ onClose, onSuccess, onChangeStep }) => {
  const [step, setStep] = useState(1);
  const { isMobile } = useIsMobile();
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>();

  const { data: session, status } = useSession();

  //console.log(session, status);

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  useEffect(() => {
    onChangeStep("Scan QR Code");
  }, []);

  const getDoctorInfo = async () => {
    setLoading(true);
    setError("");
    const res = await fetch(
      process.env.externalApiUrl + `user/code/${pin.replace("-", "")}`,
      {
        method: "GET",
      }
    );

    if (res.status === 404) {
      setError("Doctor not found");
    }
    if (res.status === 200) {
      setDoctorInfo(await res.json());
      // console.log(await res.json());
      setStep(2);
    }
    setLoading(false);
  };

  const addDoctor = async () => {
    setLoading(true);
    setError("");
    const getGroupsReq = await fetch(
      process.env.externalApiUrl + `user/group`,
      {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
          AuthUserId: session?.user?.name || "",
        },
      }
    );

    if (getGroupsReq.ok) {
      const groups = await getGroupsReq.json();
      const doctorsGroup = groups.find(
        (group: any) => group.name === "doctors"
      );
      if (doctorsGroup && doctorInfo) {
        const addDoctorReq = await fetch(
          process.env.externalApiUrl +
            `user/group/${doctorsGroup.groupID}/user_add/${doctorInfo.userID}/read`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${(session as any).accessToken}`,
              AuthUserId: session?.user?.name || "",
            },
          }
        );
        if (addDoctorReq.ok) {
          setLoading(false);
          onClose();
        }
        if (addDoctorReq.status === 409) {
          setError("The user is already a member of a group");
          setLoading(false);
        }
      }
    } else {
      setError("Error occured while getting user groups");
      setLoading(false);
    }
  };

  const desktopStep1 = (
    <div
      className={`flex column justify-center align-center ${styles["dialog-content"]}`}
    >
      <h4 className={styles["dialog-header"]}>Enter Doctor Code</h4>
      <p className={styles["dialog-text"]}>
        To add a new doctor please enter Doctor code and confirm addition.
      </p>
      <div>
        <PinInput onChange={(value: string) => setPin(value)} />
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <Button
        label="ADD DOCTOR"
        onClick={() => getDoctorInfo()}
        loading={loading}
      />
    </div>
  );

  const mobileStep1 = (
    <div>
      <div className={styles.qrcontainer} />
      <div>
        <span className="text-gray font-w500 text-center">
          To add a new doctor please scan QR code and confirm addition.
        </span>
      </div>
    </div>
  );
  return !mobile ? (
    <Dialog onClose={onClose}>
      {step === 1 && desktopStep1}
      {step === 2 && (
        <div className={`flex`}>
          <div className={styles.doctorImage} />
          <div className={`flex column justify-center ${styles.doctorInfo}`}>
            <h4 className={styles["dialog-header"]}>{doctorInfo?.name}</h4>
            <span className={styles.doctorSubTitle}>{doctorInfo?.address}</span>
            <p className={styles.doctorText}>{doctorInfo?.description}</p>
            {/* <span>Speaks English, Chinese</span> */}
            <Button
              label="ADD DOCTOR"
              onClick={() => addDoctor()}
              loading={loading}
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>
        </div>
      )}
    </Dialog>
  ) : (
    <div className={styles.addDoctorMobile}>{step === 1 && mobileStep1}</div>
  );
};

export default AddDoctorDialog;
