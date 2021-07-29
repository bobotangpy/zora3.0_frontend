import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import calculateHoroscope from "../components/calculateHoroscope";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import styles from "../styles/Signin.module.scss";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";
import API from "../services/api";

import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { reduxStore } from "../redux/_index";

const api = new API();

const SignUpSuccessPopup = () => {
  useEffect(() => {
    setTimeout(() => {
      location.reload();
    }, 2000);
  }, []);
  return (
    <div className={styles.successPopup}>
      <h3>Sign up successful !</h3>
    </div>
  );
};

const SigninTab = ({ value, index, handleSignin, props }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      //   id={`simple-tabpanel-${index}`}
      //   aria-labelledby={`simple-tab-${index}`}
    >
      <form className={styles.form}>
        <TextField
          // id="standard-basic"
          label="Email"
          type="email"
          className={styles.input}
          onChange={(e) => props.setSigninEmail(e.currentTarget.value)}
        />
        <TextField
          // id="standard-basic"
          label="Password"
          type="password"
          className={styles.input}
          onChange={(e) => props.setSigninPwd(e.currentTarget.value)}
        />

        {props.errMsg ? (
          <p style={{ color: "#ff5050", margin: "0" }}>{props.errMsg}</p>
        ) : null}

        <button onClick={handleSignin} style={{ marginTop: "30px" }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

const RegisterTab = ({
  value,
  index,
  props,
  handleNextStep,
  handleCreateUser,
  showDatePicker,
  showSumbitBtn,
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      <form
        className={styles.form}
        style={{ display: showDatePicker ? "none" : "flex" }}
      >
        <TextField
          label="Name"
          type="text"
          required
          className={styles.input}
          onChange={(e) => props.setRegName(e.currentTarget.value)}
        />
        <TextField
          label="Email"
          type="email"
          required
          className={styles.input}
          helperText={
            props.regEmailErr ? "This email address is already in use." : null
          }
          style={{ marginBottom: props.setRegEmailErr ? "0px" : "normal" }}
          onChange={(e) => props.setRegEmail(e.currentTarget.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          className={styles.input}
          onChange={(e) => props.setRegPwd(e.currentTarget.value)}
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          type="password"
          required
          className={styles.input}
          helperText={props.regPwd2err ? "Password does not match." : null}
          onChange={(e) => props.setRegPwd2(e.currentTarget.value)}
        />

        <button onClick={handleNextStep}>Next</button>
      </form>

      <div
        className={styles.datePicker}
        style={{ display: showDatePicker ? "flex" : "none" }}
      >
        <h3>Your Birthday</h3>
        <DayPickerInput
          onDayChange={(day) => props.setBday(day)}
          style={{ marginBottom: "30px" }}
        />

        <button
          style={{ display: showSumbitBtn ? "block" : "none" }}
          onClick={handleCreateUser}
        >
          Create
        </button>
      </div>
    </div>
  );
};

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [tab, setTab] = useState("signin");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSumbitBtn, setShowSubmitBtn] = useState(false);

  const [signinEmail, setSigninEmail] = useState(null);
  const [signinPwd, setSigninPwd] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const [regName, setRegName] = useState(null);
  const [regEmail, setRegEmail] = useState(null);
  const [regPwd, setRegPwd] = useState(null);
  const [regPwd2, setRegPwd2] = useState(null);
  const [bday, setBday] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [regEmailErr, setRegEmailErr] = useState(false);
  const [regPwd2err, setRegPwd2err] = useState(false);
  const [success, setSuccess] = useState(false);

  const signinProps = {
    signinEmail,
    setSigninEmail,
    signinPwd,
    setSigninPwd,
    errMsg,
  };
  const regProps = {
    regName,
    setRegName,
    regEmail,
    setRegEmail,
    regPwd,
    setRegPwd,
    regPwd2,
    setRegPwd2,
    setBday,
    regEmailErr,
    regPwd2err,
  };

  useEffect(() => {
    if (regPwd && regPwd2) {
      regPwd !== regPwd2 ? setRegPwd2err(true) : setRegPwd2err(false);
    }
  }, [regPwd, regPwd2]);

  useEffect(() => {
    if (bday) {
      setShowSubmitBtn(true);

      let date = moment(bday).format("YYYY-MM-DD");
      let month = Number(date.split("-")[1]);
      let day = Number(date.split("-")[2]);

      let sign = calculateHoroscope(month, day);
      setHoroscope(sign);

      console.log(date);
      console.log(sign);
    } else setShowSubmitBtn(false);
  }, [bday]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTab = (tab) => {
    if (tab) setTab(tab);
  };

  const handleSignin = (e) => {
    e.preventDefault();

    if (signinEmail && signinPwd) {
      console.log("sign in", signinEmail, signinPwd);

      dispatch(loginUser(signinEmail, signinPwd)).then(() => {
        !reduxStore.getState().auth.msg
          ? window.location.replace("/")
          : setErrMsg(reduxStore.getState().auth.msg);
      });
    } else return;
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    if (regName && regEmail && regPwd && !regPwd2err) {
      console.log("next step", regName, regEmail, regPwd);
      setShowDatePicker(true);
    } else return;
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    api.signup(regName, regEmail, regPwd, bday, horoscope).then((res) => {
      if (res) {
        console.log("res:::", res);
        if (res === "Sign up successful!") {
          setSuccess(true);
        } else setSuccess(false);
      }
    });
  };

  return (
    <div className={styles.signin}>
      <div className={success ? styles.success : styles.cardWrapper}>
        <Card className={styles.card}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={styles.tabs}
          >
            <Tab
              label="Sign In"
              id="simple-tabpanel-0"
              aria-labelledby="simple-tab-0"
              onClick={() => handleChangeTab("signin")}
              className={styles.tab}
            />
            <Tab
              label="Create Account"
              id="simple-tabpanel-1"
              aria-labelledby="simple-tab-1"
              onClick={() => handleChangeTab("register")}
              className={styles.tab}
            />
          </Tabs>

          <CardContent>
            <SigninTab
              value={value}
              index={0}
              props={signinProps}
              handleSignin={handleSignin}
            />
            <RegisterTab
              value={value}
              index={1}
              props={regProps}
              handleNextStep={handleNextStep}
              handleCreateUser={handleCreateUser}
              showDatePicker={showDatePicker}
              showSumbitBtn={showSumbitBtn}
            />
          </CardContent>
        </Card>
      </div>

      {success ? <SignUpSuccessPopup /> : null}
    </div>
  );
};

export default SignIn;
