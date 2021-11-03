import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../services/appProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from "../styles/CategoryMenu.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { updateSubCat } from "../redux/subCatSlice";

const CategoryMenu = ({ mobile }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const selected = useSelector((state) => state.subCat.selectedSubCat);

  useEffect(() => {
    if (selected) {
      dispatch(updateSubCat(selected));

      if (mobile)
        router.push("/category", `/${selected}`, {
          shallow: true,
        });
    }
  }, [selected]);

  return (
    <List
      component="nav"
      className={styles.list}
      style={{ padding: mobile ? "0" : "initial" }}
    >
      <ListItem
        button
        className={selected === "tops" ? styles.menuSelected : styles.menu}
        onClick={() => {
          context.setLoading(true);
          dispatch(updateSubCat("tops"));
        }}
      >
        <p style={{ paddingLeft: "20px" }}>Tops</p>
      </ListItem>
      <ListItem
        button
        className={selected === "bottoms" ? styles.menuSelected : styles.menu}
        onClick={() => {
          context.setLoading(true);
          dispatch(updateSubCat("bottoms"));
        }}
      >
        <p style={{ paddingLeft: "20px" }}>Bottoms</p>
      </ListItem>
      <ListItem
        button
        className={
          selected === "dressSuits" ? styles.menuSelected : styles.menu
        }
        onClick={() => {
          context.setLoading(true);
          dispatch(updateSubCat("dressSuits"));
        }}
      >
        {mainCat === "women" ? (
          <p style={{ paddingLeft: "20px" }}>Dresses</p>
        ) : mainCat === "men" ? (
          <p style={{ paddingLeft: "20px" }}>Suits</p>
        ) : (
          <p style={{ paddingLeft: "20px" }}>Dresses | Suits</p>
        )}
      </ListItem>
      <ListItem
        button
        className={selected === "shoes" ? styles.menuSelected : styles.menu}
        onClick={() => {
          context.setLoading(true);
          dispatch(updateSubCat("shoes"));
        }}
      >
        <p style={{ paddingLeft: "20px" }}>Shoes</p>
      </ListItem>
    </List>
  );
};

export default CategoryMenu;
