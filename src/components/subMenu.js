import { useEffect, useState } from "react";
import styles from "../styles/SubMenu.module.scss";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
import { updateStyle } from "../redux/styleSlice";

const SubMenu = ({ show, hover }) => {
  const dispatch = useDispatch();
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      if (mainCat && mainCat !== "horoscope") {
        dispatch(updateStyle(selected));
      } else if (!mainCat && hover) {
        dispatch(updateMainCat(hover));
      }
    }
  }, [mainCat, selected]);

  return (
    <Grid
      container
      className={show ? styles.visibleContainer : styles.invisibleContainer}
      style={{ marginLeft: "25px" }}
    >
      <Grid item xs={1}>
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("trending")}
        >
          Trending
        </p>
        <div className={selected === "trending" ? styles.dotTrend : ""}></div>
      </Grid>

      <Grid item xs={1}>
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("casual")}
        >
          Casual
        </p>
        <div className={selected === "casual" ? styles.dotCasual : ""}></div>
      </Grid>

      <Grid item xs={1}>
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("formal")}
        >
          Formal
        </p>
        <div className={selected === "formal" ? styles.dotFormal : ""}></div>
      </Grid>

      <Grid item xs={6}>
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("goingOut")}
        >
          Going-out-out
        </p>
        <div className={selected === "goingOut" ? styles.dotOut : ""}></div>
      </Grid>
    </Grid>
  );
};

export default SubMenu;
