import { useState, useContext } from "react";
import { AppContext } from "../services/appProvider";
import CategoryMenu from "./categoryMenu";
import Link from "next/link";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import { useDispatch, useSelector } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
// import { updateSubCat } from "../redux/subCatSlice";
import { updateStyle } from "../redux/styleSlice";

// const closeStyle = {
//   position: "absolute",
//   right: "7rem",
//   top: "0.5rem",
//   color: "#fff",
//   zIndex: "1400",
// };

const MobileMenu = ({ openMobileMenu, setOpenMobileMenu }) => {
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  //   const selected = useSelector((state) => state.mainCat.selectedMainCat);
  const [expanded, setExpanded] = useState(false);

  const toggleMenuDrawer = (open) => (e) => {
    // if (e && (e.key === "Tab" || e.key === "Shift")) {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    open ? setOpenMobileMenu(true) : setOpenMobileMenu(false);
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {openMobileMenu && (
        <CloseOutlinedIcon
          className="closeIcon"
          style={{
            display:
              window.innerWidth <= 768 && window.innerWidth > 414
                ? "none"
                : "initial",
          }}
          onClick={() => setOpenMobileMenu(false)}
        />
      )}

      <SwipeableDrawer
        anchor={"left"}
        open={openMobileMenu}
        onClose={toggleMenuDrawer(false)}
        onOpen={toggleMenuDrawer(true)}
      >
        <div
          role="presentation"
          // onClick={toggleMenuDrawer(false)}
          // onKeyDown={toggleMenuDrawer(false)}
        >
          <Accordion
            style={{
              boxShadow: "none",
              minHeight: "48px",
              padding: "12px 16px",
            }}
          >
            {/* <AccordionSummary> */}
            <Link href="/category" as="horoscope_of_the_month">
              <p
                aria-controls="horoscope-menu"
                aria-haspopup="true"
                variant="contained"
                style={{ margin: "12px" }}
                onClick={() => {
                  dispatch(updateMainCat("horoscope"));
                  dispatch(updateStyle(null));
                  context.setLoading(true);
                }}
              >
                Horoscope of the Month
              </p>
            </Link>
            {/* </AccordionSummary> */}
          </Accordion>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleExpand("panel1")}
            style={{ boxShadow: "none" }}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <p
                aria-controls="women-menu"
                style={{ margin: "12px" }}
                onClick={() => {
                  dispatch(updateMainCat("women"));
                  toggleMenuDrawer(false);
                }}
              >
                Women
              </p>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column", padding: "0" }}
            >
              <CategoryMenu
                mobile={true}
                setOpenMobileMenu={setOpenMobileMenu}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleExpand("panel2")}
            style={{ boxShadow: "none" }}
          >
            <AccordionSummary
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <p
                aria-controls="men-menu"
                style={{ margin: "12px" }}
                onClick={() => {
                  dispatch(updateMainCat("men"));
                  toggleMenuDrawer(false);
                }}
              >
                Men
              </p>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column" }}
            >
              <CategoryMenu
                mobile={true}
                setOpenMobileMenu={setOpenMobileMenu}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default MobileMenu;
