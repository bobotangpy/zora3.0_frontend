import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import SubMenu from "./subMenu";
import MobileMenu from "./mobileMenu";
import CartItemList from "./cartItemList";
import Loading from "./loading";
import { AppContext } from "../services/appProvider";
import styles from "../styles/Navbar.module.scss";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import store from "store-js";

import { useDispatch, useSelector } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
import { updateSubCat } from "../redux/subCatSlice";
import { updateStyle } from "../redux/styleSlice";
import { updateCart } from "../redux/cartSlice";

const SignedInNav = ({
  context,
  username,
  horoscope,
  badgeNum,
  cartItems,
  openCartPreview,
  toggleDrawer,
  userMenuAnchor,
  setUserMenuAnchor,
}) => {
  return (
    <div className={styles.signedIn}>
      <div className={styles.userWelcomeMsg}>
        <p
          style={{
            display: "flex",
            flexDirection:
              typeof window !== "undefined" && window.innerWidth <= 1209
                ? "row"
                : "column",
            fontSize:
              typeof window !== "undefined" && window.innerWidth <= 1209
                ? "initial"
                : "15.2px",
          }}
        >
          Welcome {username}, <span>the beautiful {horoscope}</span>
        </p>
        <img
          alt="icon"
          src={`/assets/images/icons/${horoscope}.png`}
          className={styles.icon}
          width={25}
          height={25}
        />
      </div>

      <SettingsIcon
        className={`${styles.menu} ${styles.settings}`}
        onClick={(e) => setUserMenuAnchor(e.currentTarget)}
      />

      {/* User Dropdown Menu */}
      <Menu
        elevation={1}
        anchorEl={userMenuAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        style={{ marginTop: "12px" }}
      >
        <Link href="/profile">
          <MenuItem
            style={{ minWidth: "95px", paddingLeft: "23px" }}
            onClick={() => {
              context.setLoading(true);
              setUserMenuAnchor(null);
            }}
          >
            Profile
          </MenuItem>
        </Link>
        <Link href="/orderHistory" as="order_history">
          <MenuItem
            style={{ minWidth: "95px", paddingLeft: "23px" }}
            onClick={() => setUserMenuAnchor(null)}
          >
            Orders
          </MenuItem>
        </Link>
        {!context.fullWidth && (
          <MenuItem
            style={{ minWidth: "95px", paddingLeft: "23px" }}
            onClick={() => {
              setUserMenuAnchor(null);
              store.clearAll();
              window.location.replace("/");
            }}
          >
            Sign Out
          </MenuItem>
        )}
      </Menu>

      {/* Cart Icon */}
      <span
        className={styles.menu}
        style={{
          paddingBottom: "5px",
          marginLeft: !context.fullWidth ? "15px" : "10px",
        }}
      >
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
            <CartItemList items={cartItems} handleClose={toggleDrawer(false)} />
          </div>
        </SwipeableDrawer>
      </span>

      {context.fullWidth && (
        <p
          className={styles.signOut}
          onClick={() => {
            store.clearAll();
            window.location.replace("/");
          }}
        >
          Sign Out
        </p>
      )}
    </div>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.mainCat.selectedMainCat);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const context = useContext(AppContext);
  // const drawerRef = useRef();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [hover, setHover] = useState(null);
  // const [showSubMenu, setShowSubMenu] = useState(false);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const [openCartPreview, setOpenCartPreview] = useState(false);
  // const [drawerAnchor, setDrawerAnchor] = useState(null);

  const [userName, setUserName] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [badgeNum, setbadgeNum] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  useEffect(() => {
    if (!store.get("user_token")) return setUserName(null);

    if (store.get("username")) {
      let name = store.get("username");
      name = name.charAt(0).toUpperCase() + name.slice(1);
      // console.log(name);
      setUserName(name);
      context.setUsername(name);
    }

    if (store.get("user_id")) context.setUserId(store.get("user_id"));

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
      // onMouseLeave={() => {
      //   setAnchorEl(null);
      //   setShowSubMenu(false);
      //   setHover(null);
      // }}
    >
      {typeof window !== "undefined" && window.innerWidth > "730px" ? (
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
                context.setLoading(true);
              }}
              // onMouseEnter={(e) => {
              //   setAnchorEl(null);
              //   setShowSubMenu(false);
              // }}
            >
              Horoscope of the Month
            </p>
          </Link>

          <Link href="/category" as="/women">
            <p
              aria-controls="women-menu"
              className={
                selected === "women" ? styles.menuSelected : styles.menu
              }
              onClick={() => dispatch(updateMainCat("women"))}
              // onMouseEnter={(e) => {
              //   setAnchorEl(e.currentTarget);
              //   setShowSubMenu(true);
              //   setHover("women");
              // }}
            >
              Women
            </p>
          </Link>

          <Link href="/category" as="/men">
            <p
              aria-controls="men-menu"
              className={selected === "men" ? styles.menuSelected : styles.menu}
              onClick={() => dispatch(updateMainCat("men"))}
              // onMouseEnter={(e) => {
              //   setAnchorEl(e.currentTarget);
              //   setShowSubMenu(true);
              //   setHover("men");
              // }}
            >
              Men
            </p>
          </Link>
        </Grid>
      ) : (
        <>
          <MenuIcon
            onClick={() => setOpenMobileMenu(true)}
            style={{ marginLeft: "30px", cursor: "pointer" }}
          />
          <MobileMenu
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
          />
        </>
      )}

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
          paddingRight: context.fullWidth ? "25px" : "10px",
        }}
      >
        {userName ? (
          <SignedInNav
            context={context}
            // fullWidth={fullWidth}
            username={userName}
            horoscope={horoscope}
            badgeNum={badgeNum}
            cartItems={cartItems}
            openCartPreview={openCartPreview}
            toggleDrawer={toggleDrawer}
            userMenuAnchor={userMenuAnchor}
            setUserMenuAnchor={setUserMenuAnchor}
          />
        ) : (
          <Link href="/sign_in">
            <p
              className={styles.menu}
              onClick={() =>
                window.location.pathname === "sign_in"
                  ? location.reload()
                  : context.setLoading(true)
              }
            >
              Sign in
            </p>
          </Link>
        )}
      </Grid>

      {typeof window !== "undefined" &&
        window.innerWidth >= 736 &&
        window.location.pathname !== "/" &&
        !window.location.pathname.includes("productInfo") &&
        !window.location.pathname.includes("profile") &&
        !window.location.pathname.includes("checkout") &&
        !window.location.pathname.includes("order") &&
        !window.location.pathname.includes("sign_in") &&
        selected &&
        selected !== "horoscope" && (
          <SubMenu
            show={true}
            // hover={hover}
          />
        )}

      {context.loading && <Loading />}
    </Grid>
  );
};

export default NavBar;
