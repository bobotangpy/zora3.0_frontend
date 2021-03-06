// TODO: REsponsiveness!!!

// import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SubMenu from "./subMenu";
import CartItemList from "./cartItemList";
import { AppContext } from "../services/appProvider";
import styles from "../styles/Navbar.module.scss";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import store from "store-js";
// import MenuIcon from "@material-ui/icons/Menu";

import { useDispatch, useSelector } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
import { updateSubCat } from "../redux/subCatSlice";
import { updateStyle } from "../redux/styleSlice";
import { updateCart } from "../redux/cartSlice";

const SignedInNav = ({
  username,
  horoscope,
  badgeNum,
  cartItems,
  openCartPreview,
  toggleDrawer,
  // router,
}) => {
  return (
    <div className={styles.signedIn}>
      <p>
        Welcome {username}, the beautiful {horoscope}
      </p>
      <img
        alt="icon"
        src={`/assets/images/icons/${horoscope}.png`}
        className={styles.icon}
        width={25}
        height={25}
      />

      {/* Cart Icon */}
      <span className={styles.menu} style={{ paddingBottom: "5px" }}>
        <Badge badgeContent={badgeNum} onClick={toggleDrawer(true)}>
          <LocalMallOutlinedIcon />
        </Badge>

        <SwipeableDrawer
          anchor={"right"}
          open={openCartPreview}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <CartItemList items={cartItems} />
          </div>
        </SwipeableDrawer>
      </span>

      <p
        className={styles.signOut}
        onClick={() => {
          store.clearAll();
          window.location.replace("/");
        }}
      >
        Sign Out
      </p>
    </div>
  );
};

const NavBar = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.mainCat.selectedMainCat);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const context = useContext(AppContext);
  const drawerRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hover, setHover] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const [openCartPreview, setOpenCartPreview] = useState(false);
  const [drawerAnchor, setDrawerAnchor] = useState(null);

  const [userName, setUserName] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [badgeNum, setbadgeNum] = useState(null);

  useEffect(() => {
    if (!store.get("user_token")) return setUserName(null);

    if (store.get("username")) {
      setUserName(store.get("username"));
      context.setUsername(store.get("username"));
    }

    if (store.get("horoscope")) {
      setHoroscope(store.get("horoscope"));
      context.setUserSign(store.get("horoscope"));
    }

    if (store.get("cartItems")) {
      dispatch(updateCart(store.get("cartItems")));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      setbadgeNum(cartItems.length);
    } else setbadgeNum(null);
  }, [cartItems]);

  const clearSelections = () => {
    dispatch(updateMainCat(null));
    dispatch(updateSubCat(null));
    dispatch(updateStyle(null));
  };

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    open ? setOpenCartPreview(true) : setOpenCartPreview(false);
  };

  return (
    <Grid
      container
      className={styles.navbar}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onMouseLeave={() => {
        setAnchorEl(null);
        setShowSubMenu(false);
        setHover(null);
      }}
    >
      <Grid item xs={6} className={styles.menuCol}>
        <Link href="/category" as="horoscope_of_the_month">
          <p
            aria-controls="horoscope-menu"
            aria-haspopup="true"
            variant="contained"
            className={
              selected === "horoscope" ? styles.menuSelected : styles.menu
            }
            onClick={() => {
              dispatch(updateMainCat("horoscope"));
              dispatch(updateStyle(null));
            }}
            onMouseEnter={(e) => {
              setAnchorEl(null);
              setShowSubMenu(false);
            }}
          >
            Horoscope of the Month
          </p>
        </Link>

        <Link href="/category" as="/women">
          <p
            aria-controls="women-menu"
            className={selected === "women" ? styles.menuSelected : styles.menu}
            onClick={() => dispatch(updateMainCat("women"))}
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
            onClick={() => dispatch(updateMainCat("men"))}
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
          <p
            className={styles.logo}
            onClick={() => {
              clearSelections();
            }}
          >
            Zora
          </p>
        </Link>
      </>

      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "25px",
        }}
      >
        {userName ? (
          <SignedInNav
            username={userName}
            horoscope={horoscope}
            badgeNum={badgeNum}
            cartItems={cartItems}
            openCartPreview={openCartPreview}
            toggleDrawer={toggleDrawer}
            // router={router}
          />
        ) : (
          <Link href="/sign_in">
            <p className={styles.menu}>Sign in</p>
          </Link>
        )}
      </Grid>

      <SubMenu show={showSubMenu} hover={hover} />
    </Grid>
  );
};

export default NavBar;
