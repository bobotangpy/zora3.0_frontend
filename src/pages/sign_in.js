import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import SignIn from "../components/signIn";
import styles from "../styles/Signin.module.scss";
import store from "store-js";

const SignInPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (store.get("user_token") && store.get("user_id")) router.replace("/");
    context.setLoading(false);
  }, []);

  return (
    <div className={styles.signin}>
      {!store.get("user_token") && (
        <div className={success ? styles.success : styles.cardWrapper}>
          <SignIn setSuccessSignup={setSuccess} />
        </div>
      )}
    </div>
  );
};

export default SignInPage;
