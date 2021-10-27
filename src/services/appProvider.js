import { createContext, useState, useEffect } from "react";
import calculateHoroscope from "../components/calculateHoroscope";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [monthSign, setMonthSign] = useState(null);
  const [username, setUsername] = useState(null);
  const [userSign, setUserSign] = useState(null);
  const [bg, setBg] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [mainCat, setMainCat] = useState(null);
  // const [subCat, setSubCat] = useState(null);
  // const [style, setStyle] = useState(null);

  // const [topsData, setTopsData] = useState(null);
  // const [bottomsData, setBottomsData] = useState(null);
  // const [dressSuitsData, setDressSuitsData] = useState(null);
  // const [shoesData, setShoesData] = useState(null);

  useEffect(() => {
    let date = moment().format("YYYY-MM-DD");
    let month = Number(date.split("-")[1]);
    let day = Number(date.split("-")[2]);
    let sign = calculateHoroscope(month, day);
    setMonthSign(sign);
  }, []);

  useEffect(() => {
    userSign
      ? setBg(
          {
            margin: "0px",
            background: `linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url('/assets/images/backgound/${userSign}_bg.png') fixed center`,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }
          // `url('/assets/images/backgound/${userSign}_bg.png') fixed no-repeat center`
        )
      : setBg(
          {
            margin: "0px",
            background: `linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url('/assets/images/landing/landing_bg.jpg') fixed no-repeat center`,
            minHeight: "calc(100vh - 90px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: "50px",
          }
          // `url('/assets/images/backgound/landing/landing_bg.jpg') fixed no-repeat center`
        );
  }, [userSign]);

  const values = {
    monthSign,
    username,
    userSign,
    bg,
    loading,
    setUsername,
    setUserSign,
    setLoading,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
