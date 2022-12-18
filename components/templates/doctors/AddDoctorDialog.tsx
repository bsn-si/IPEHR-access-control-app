import React, { FC, useState, useEffect } from "react";
import Button from "../../ui/Button";
import { Dialog } from "../../ui/Dialog/Dialog";
import styles from "../../../styles/Doctors.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";
import PinInput from "../../ui/PinInput/PinInput";

interface DoctorInfo {
  address: string;
  code: string;
  description: string;
  name: string;
  pictureURL: string;
  role: string;
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

  useEffect(() => {
    setMobile(isMobile());
  }, [isMobile]);

  useEffect(() => {
    onChangeStep("Scan QR Code");
  }, []);

  const getDoctorInfo = async () => {
    setLoading(true);
    setError("");
    const res = await fetch(process.env.externalApiUrl + `user/code/${pin}`, {
      method: "GET",
    });

    if (res.status === 404) {
      setError("Doctor not found");
    }
    if (res.status === 200) {
      setDoctorInfo(await res.json());
      setStep(2);
    }
    setLoading(false);
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
              onClick={() =>
                onSuccess({
                  name: "Dr. Jones",
                  address: "Cleveland Clinic, 33 Grosvenor Pl, London",
                  description: `Primary clinical interests are Thyroid Cancer, Thyroid Nodules,
                  Thyroid Goitres, Primary Hyperparathyroidism, Adrenal Tumours`,
                  languages: ["English", "Chinese"],
                })
              }
            />
          </div>
        </div>
      )}
    </Dialog>
  ) : (
    <div className={styles.addDoctorMobile}>{step === 1 && mobileStep1}</div>
  );
};

export default AddDoctorDialog;
