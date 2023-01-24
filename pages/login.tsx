import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import Doctor from "../components/graphics/Doctor";
import Ipehr from "../components/icons/Ipehr";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input/Input";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import LoginIcon from "../components/icons/LoginIcon";
import LockIcon from "../components/icons/Lock";

export async function getServerSideProps(context: any) {
  return {
    props: {
      // csrfToken: await getCsrfToken(context),
    },
  };
}

export default function Login() {
  const [userID, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const performLogin = async () => {
    setLoading(true);
    setError(false);
    const res = await signIn("credentials", {
      redirect: false,
      userID: userID,
      password: password,
    });
    if (res?.ok) {
      setLoading(false);
      router.push("/doctors");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <Ipehr />
        </div>
      </div>
      <div className="flex justify-center column align-center">
        <Doctor />
        <div className={`${styles.form} flex column`}>
          <div className="flex justify-center mt-xl">
            <h3>Welcome!</h3>
          </div>
          <form onSubmit={(e: any) => e.preventDefault()}>
            <div className="flex justify-center mt-md">
              <Input
                onInput={(value) => setLogin(value)}
                label="Login"
                Icon={LoginIcon}
              />
            </div>
            <div className="flex justify-center mt-md mb-xl">
              <Input
                onInput={(value) => setPassword(value)}
                label="Password"
                Icon={LockIcon}
                type="password"
              />
            </div>
            {error && (
              <div className={`flex justify-center ${styles.error}`}>
                <span>Invalid credentials</span>
              </div>
            )}
            <div className="flex justify-center">
              <Button
                label="SIGN IN"
                onClick={performLogin}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
