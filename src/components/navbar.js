import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import SubMenu from "./subMenu";
import { AppContext } from "../services/appProvider";
import styles from "../styles/Navbar.module.scss";
import Grid from "@material-ui/core/Grid";
// import MenuIcon from "@material-ui/icons/Menu";

const NavBar = () => {
  const context = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);

  useEffect(() => {
    if (selected) {
      console.log(selected);
      context.setMainCat(selected);
    }
  }, [selected]);

  return (
    <Grid
      container
      className={styles.navbar}
      direction="row"
      justify="space-between"
      alignItems="center"
      onMouseLeave={() => {
        setAnchorEl(null);
        setShowSubMenu(false);
        setHover(null);
      }}
    >
      <Grid item xs="6" className={styles.menuCol}>
        <Link href="/category">
          <p
            aria-controls="horoscope-menu"
            aria-haspopup="true"
            variant="contained"
            className={
              selected === "horoscope" ? styles.menuSelected : styles.menu
            }
            onClick={() => {
              setSelected("horoscope");
            }}
            onMouseEnter={(e) => {
              setAnchorEl(e.currentTarget);
              setShowSubMenu(true);
              setHover("horoscope");
            }}
          >
            Horoscope of the Month
          </p>
        </Link>

        <Link href="/category" as="/women">
          <p
            aria-controls="women-menu"
            className={selected === "women" ? styles.menuSelected : styles.menu}
            onClick={() => setSelected("women")}
            onMouseEnter={(e) => {
              setAnchorEl(e.currentTarget);
              setShowSubMenu(true);
              setHover("women");
            }}
          >
            Women
          </p>
        </Link>

        <Link href="/category" as="/men">
          <p
            aria-controls="men-menu"
            className={selected === "men" ? styles.menuSelected : styles.menu}
            onClick={() => setSelected("men")}
            onMouseEnter={(e) => {
              setAnchorEl(e.currentTarget);
              setShowSubMenu(true);
              setHover("men");
            }}
          >
            Men
          </p>
        </Link>
      </Grid>

      <>
        <Link href="/">
          <p className={styles.logo}>Zora</p>
        </Link>
      </>

      <Grid
        item
        xs="6"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "15px",
        }}
      >
        <Link href="/sign_in">
          <p className={styles.menu}>Sign in</p>
        </Link>
      </Grid>

      <SubMenu show={showSubMenu} />
    </Grid>
  );
};

export default NavBar;
