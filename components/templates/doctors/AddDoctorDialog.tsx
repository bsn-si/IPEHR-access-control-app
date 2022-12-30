import React, { FC, useState, useEffect, use } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Doctors.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";
import PinInput from "../../ui/PinInput/PinInput";
import { useSession } from "next-auth/react";
import { User } from "../../../models/User";
import { UserGroup } from "../../../models/UserGroup";
import { GetUserByCode } from "../../../requests/User";
import { AddUserToGroup } from "../../../requests/UserGroup";
import { Html5Qrcode } from "html5-qrcode";

interface AddDoctorProps {
  doctorsGroup: UserGroup;
  onClose: () => void;
  onSuccess: (doctor: User) => void;
  onChangeStep: (step: string) => void;
}

const AddDoctorDialog: FC<AddDoctorProps> = ({
  doctorsGroup,
  onClose,
  onSuccess,
  onChangeStep,
}) => {
  const [step, setStep] = useState(1);
  const { isMobile } = useIsMobile();
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [doctorInfo, setDoctorInfo] = useState<User>();

  const { data: session, status } = useSession();

  useEffect(() => {
    setMobile(isMobile());

    if (isMobile() && step === 1) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          /**
           * devices would be an array of objects of type:
           * { id: "id", label: "label" }
           */
          if (devices && devices.length) {
            var cameraId = devices[0].id;
            // .. use this to start scanning.
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(navigator.mediaDevices?.getUserMedia({ video: true }));
    }
  }, [isMobile]);

  useEffect(() => {
    onChangeStep("Scan QR Code");

    // Html5Qrcode.getCameras()
    //   .then((devices) => {
    //     /**
    //      * devices would be an array of objects of type:
    //      * { id: "id", label: "label" }
    //      */
    //     console.log(devices);
    //     if (devices && devices.length) {
    //       var cameraId = devices[0].id;
    //       // .. use this to start scanning.
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const getDoctorInfo = async () => {
    setLoading(true);
    setError("");
    const user = await GetUserByCode(pin.replace("-", ""));

    if (!user) {
      setError("Doctor not found");
    } else {
      setDoctorInfo(user);
      setStep(2);
    }
    setLoading(false);
  };

  const addDoctor = async () => {
    setLoading(true);
    setError("");

    if (session?.user?.name && doctorInfo?.userID) {
      const addResponse = await AddUserToGroup(
        (session as any).accessToken,
        session?.user?.name,
        doctorsGroup.groupID,
        doctorInfo?.userID
      );
      if (addResponse.ok) {
        setLoading(false);
        onSuccess(doctorInfo);
      }
      if (addResponse.status === 409) {
        setError("The user is already a member of a group");
        setLoading(false);
      }
    } else {
      console.log("session not found", session, doctorInfo);
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
        <div className={styles.doctorInfo}>
          <div className={styles.doctorImage} />
          <div
            className={`flex column justify-center ${styles.doctorInfoText}`}
          >
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
