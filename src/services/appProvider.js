import { createContext, useState, useEffect } from "react";
import calculateHoroscope from "../components/calculateHoroscope";
import moment from "moment";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [monthSign, setMonthSign] = useState(null);
  const [mainCat, setMainCat] = useState(null);
  const [subCat, setSubCat] = useState(null);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    let date = moment().format("YYYY-MM-DD");
    let month = Number(date.split("-")[1]);
    let day = Number(date.split("-")[2]);
    let sign = calculateHoroscope(month, day);
    setMonthSign(sign);
  }, []);

  const values = {
    monthSign,
    mainCat,
    subCat,
    style,
    setMainCat,
    setSubCat,
    setStyle,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
