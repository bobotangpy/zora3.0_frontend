import { createContext, useState, useEffect } from "react";
import calculateHoroscope from "../components/calculateHoroscope";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [monthSign, setMonthSign] = useState(null);
  const [username, setUsername] = useState(null);
  const [userSign, setUserSign] = useState(null);

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

  const values = {
    monthSign,
    username,
    userSign,
    setUsername,
    setUserSign,
    // mainCat,
    // subCat,
    // style,
    // topsData,
    // bottomsData,
    // dressSuitsData,
    // shoesData,
    // setMainCat,
    // setSubCat,
    // setStyle,
    // setTopsData,
    // setBottomsData,
    // setDressSuitsData,
    // setShoesData,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
