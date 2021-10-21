import { useState } from "react";
import SignIn from "../components/signIn";
import styles from "../styles/Signin.module.scss";

const SignInPage = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.signin}>
      <div className={success ? styles.success : styles.cardWrapper}>
        <SignIn setSuccessSignup={setSuccess} />
      </div>
    </div>
  );
};

export default SignInPage;
