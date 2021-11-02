import { useContext } from "react";
import { AppContext } from "../services/appProvider";
import store from "store-js";

export const BgWrapper = ({ children }) => {
  const context = useContext(AppContext);

  const background = () => {
    if (!store.get("horoscope")) {
      return {
        margin: "0px",
        background: `linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url('/assets/images/landing/landing_bg.jpg') fixed no-repeat center`,
        // position: "relative",
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        // flexFlow: "column",
        // alignItems: "center",
      };
    } else {
      return {
        margin: "0px",
        background: `linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url('/assets/images/backgound/${store.get(
          "horoscope"
        )}_bg.png') center left fixed`,
        // position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        // flexFlow: "column",
        // alignItems: "center",
        paddingBottom: "50px",
      };
    }
  };

  return (
    <div className="bgWrapper" style={context.bg ? context.bg : background()}>
      {children}
    </div>
  );
};
