import { useState } from "react";
import styles from "../styles/Signin.module.scss";

import SignIn from "../components/signIn";

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
