import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import styles from "../styles/SubMenu.module.scss";
import Grid from "@material-ui/core/Grid";

import { useDispatch } from "react-redux";

const SubMenu = ({ show, hover }) => {
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      console.log(hover);
      if (context.mainCat !== "horoscope") {
        console.log(selected);
        // console.log(context);
        context.setStyle(selected);
      } else if (!context.mainCat && hover) {
        context.setMainCat(hover);
      }
      // window.location.replace("/category");
    }
  }, [selected, context.mainCat]);

  return (
    <Grid
      container
      className={show ? styles.visibleContainer : styles.invisibleContainer}
      style={{ marginLeft: "25px" }}
    >
      <Grid item xs={1}>
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => dispatch(upateStyle("trending"))}
          // onClick={() => setSelected("trending")}
        >
          Trending
        </p>
        {/* </Link> */}
        <div className={selected === "trending" ? styles.dotTrend : ""}></div>
      </Grid>

      <Grid item xs={1}>
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => dispatch(upateStyle("casual"))}
          // onClick={() => setSelected("casual")}
        >
          Casual
        </p>
        {/* </Link> */}
        <div className={selected === "casual" ? styles.dotCasual : ""}></div>
      </Grid>

      <Grid item xs={1}>
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => dispatch(upateStyle("formal"))}
          // onClick={() => setSelected("formal")}
        >
          Formal
        </p>
        {/* </Link> */}
        <div className={selected === "formal" ? styles.dotFormal : ""}></div>
      </Grid>

      <Grid item xs={6}>
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => dispatch(upateStyle("goingOut"))}
          // onClick={() => setSelected("goingOut")}
        >
          Going-out-out
        </p>
        {/* </Link> */}
        <div className={selected === "goingOut" ? styles.dotOut : ""}></div>
      </Grid>
    </Grid>
  );
};

export default SubMenu;
