import { useEffect, useState } from "react";
import styles from "../styles/SubMenu.module.scss";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
import { updateStyle } from "../redux/styleSlice";

const SubMenu = ({ show, hover, mobileMenu }) => {
  const dispatch = useDispatch();
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      if (mainCat && mainCat !== "horoscope") {
        dispatch(updateStyle(selected));
      } else if (!mainCat && hover) {
        dispatch(updateMainCat(hover));
        // window.location.replace("/category");
      }
    }
  }, [mainCat, selected]);

  return (
    <Grid
      container
      className={
        show
          ? styles.visibleContainer
          : mobileMenu
          ? styles.mobileMenu
          : styles.invisibleContainer
      }
      style={{ marginLeft: "25px" }}
    >
      <Grid
        item
        // xs={1}
      >
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p className={styles.submenu} onClick={() => setSelected("trending")}>
          Trending
        </p>
        {/* </Link> */}
        <div className={selected === "trending" ? styles.dotTrend : ""}></div>
      </Grid>

      <Grid
        item
        // xs={1}
      >
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p className={styles.submenu} onClick={() => setSelected("casual")}>
          Casual
        </p>
        {/* </Link> */}
        <div className={selected === "casual" ? styles.dotCasual : ""}></div>
      </Grid>

      <Grid
        item
        // xs={1}
      >
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p className={styles.submenu} onClick={() => setSelected("formal")}>
          Formal
        </p>
        {/* </Link> */}
        <div className={selected === "formal" ? styles.dotFormal : ""}></div>
      </Grid>

      <Grid item xs={!mobileMenu ? 6 : "auto"}>
        {/* <Link href={selected && hover ? "/category" : ""} as={`/${hover}`}> */}
        <p className={styles.submenu} onClick={() => setSelected("goingOut")}>
          Going-out-out
        </p>
        {/* </Link> */}
        <div className={selected === "goingOut" ? styles.dotOut : ""}></div>
      </Grid>
    </Grid>
  );
};

export default SubMenu;
