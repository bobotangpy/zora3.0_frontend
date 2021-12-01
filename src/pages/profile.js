import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import Card from "@material-ui/core/Card";
import Loading from "../components/loading";
import { calculateHoroscope } from "../utilities/utils";
// import TextField from "@material-ui/core/TextField";
import styles from "../styles/Signin.module.scss";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import API from "../services/api";
import store from "store-js";
import moment from "moment";

const api = new API();

const Profile = () => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [confirmPwd, setConfirmPwd] = useState(null);
  const [bday, setBday] = useState(null);
  const [sign, setSign] = useState(null);
  const [pwdErr, setPwdErr] = useState(false);

  useEffect(() => {
    context.setLoading(true);
    if (store.get("user_id")) {
      api
        .queryUserProfile(store.get("user_id"))
        .then((res) => {
          console.log(res);
          if (res && res.hasOwnProperty("name")) {
            setEmail(res.email);
            setName(res.name);
            setBday(moment(res.birthday).format("YYYY-MM-DD"));
            setSign(res.horoscope);
          } else {
            console.log("No user data");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (email && name && bday && sign) context.setLoading(false);
  }, [email, name, bday, sign]);

  useEffect(() => {
    if ((!pwd && !confirmPwd) || (pwd.length < 1 && confirmPwd.length < 1))
      setPwdErr(false);
    pwd !== confirmPwd ? setPwdErr(true) : setPwdErr(false);
  }, [pwd, confirmPwd]);

  useEffect(() => {
    if (bday) {
      console.log(bday);
      let date = moment(bday).format("YYYY-MM-DD");
      let month = Number(date.split("-")[1]);
      let day = Number(date.split("-")[2]);

      let sign = calculateHoroscope(month, day);
      setSign(sign);
    }
  }, [bday]);

  const handleUpdateProfile = () => {
    api.updateUserProfile(context.userId, name, pwd, bday, sign).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className={styles.profile}>
      <h1
        style={{
          margin: context.fullWidth ? "0 200px 15px" : "0 0 15px",
          alignSelf: "baseline",
          color: "#ffffff",
        }}
      >
        Profile
      </h1>

      {context.loading ? (
        <Loading />
      ) : (
        <div className={styles.cardWrapper}>
          <Card
            className={styles.signin}
            style={{ width: "800px", padding: "50px" }}
          >
            <div className={styles.inputDiv}>
              <div className={styles.inputCol}>
                <label>Email</label>
                <label>Name</label>
                <label>Password</label>
                <label>Confirm Password</label>
                <label
                  style={pwdErr ? { marginTop: "20px" } : { marginTop: "10px" }}
                >
                  Birthday
                </label>
                <label
                  style={pwdErr ? { marginTop: "16px" } : { marginTop: "10px" }}
                >
                  Horoscope
                </label>
              </div>

              <div className={styles.inputCol}>
                <input
                  label="Email"
                  disabled
                  className={`${styles.input} ${styles.pInput}`}
                  defaultValue={email}
                />
                <input
                  label="Name"
                  type="text"
                  className={`${styles.input} ${styles.pInput}`}
                  defaultValue={name}
                  //   onChange={(e) => setName(e.currentTarget.value)}
                />
                <input
                  label="Password"
                  type="password"
                  className={`${styles.input} ${styles.pInput}`}
                  onChange={(e) => setPwd(e.currentTarget.value)}
                />
                <input
                  label="Confirm Password"
                  type="password"
                  className={`${styles.input} ${styles.pInput}`}
                  style={{
                    marginTop:
                      typeof window !== "undefined" && window.innerWidth <= 736
                        ? "35px"
                        : "10px",
                  }}
                  onChange={(e) => setConfirmPwd(e.currentTarget.value)}
                />
                {pwdErr && (
                  <p className={styles.err}>Password does not match.</p>
                )}

                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  //   format="YYYY-M-D"
                  value={formatDate(bday)}
                  placeholder={`${formatDate(bday)}`}
                  onDayChange={(day) => setBday(day)}
                  style={{
                    // marginBottom: "2px",
                    marginTop: pwdErr ? "0" : "5px",
                  }}
                />

                {sign && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "15px",
                      marginBottom: "50px",
                      marginTop: !pwdErr ? "-4px" : "0",
                    }}
                  >
                    <p>{sign}</p>
                    <img
                      src={`/assets/images/icons/${sign}.png`}
                      alt={sign}
                      height={20}
                      style={{ marginTop: "17px", marginLeft: "5px" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleUpdateProfile}>Update Profile</button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
