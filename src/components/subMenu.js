import { useContext, useEffect, useState } from "react";
import styles from "../styles/SubMenu.module.scss";
import { AppContext } from "../services/appProvider";
import Grid from "@material-ui/core/Grid";

const SubMenu = ({ show }) => {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      console.log(selected);
      context.setStyle(selected);
    }
  }, [selected]);

  return (
    <Grid
      container
      className={show ? styles.visibleContainer : styles.invisibleContainer}
      style={{ marginLeft: "25px" }}
    >
      <Grid item xs="1">
        {/* <Link href={{ pathname: "" }} as=""> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("trending")}
        >
          Trending
        </p>
        {/* </Link> */}
        <div className={selected === "trending" ? styles.dotTrend : ""}></div>
      </Grid>

      <Grid item xs="1">
        {/* <Link href={{ pathname: "" }} as=""> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("casual")}
        >
          Casual
        </p>
        {/* </Link> */}
        <div className={selected === "casual" ? styles.dotCasual : ""}></div>
      </Grid>

      <Grid item xs="1">
        {/* <Link href={{ pathname: "" }} as=""> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("formal")}
        >
          Formal
        </p>
        {/* </Link> */}
        <div className={selected === "formal" ? styles.dotFormal : ""}></div>
      </Grid>

      <Grid item xs="6">
        {/* <Link href={{ pathname: "" }} as=""> */}
        <p
          m={{ l: "2rem", r: "1.5rem" }}
          className={styles.submenu}
          onClick={() => setSelected("goingOut")}
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
