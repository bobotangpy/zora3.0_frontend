import { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from "../styles/CategoryMenu.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { updateSubCat } from "../redux/subCatSlice";

const CategoryMenu = () => {
  const dispatch = useDispatch();
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const selected = useSelector((state) => state.subCat.selectedSubCat);

  useEffect(() => {
    if (selected) {
      dispatch(updateSubCat(selected));
    }
  }, [selected]);

  return (
    <List component="nav" className={styles.list}>
      <ListItem
        button
        className={selected === "tops" ? styles.menuSelected : styles.menu}
        onClick={() => dispatch(updateSubCat("tops"))}
      >
        <p>Tops</p>
      </ListItem>
      <ListItem
        button
        className={selected === "bottoms" ? styles.menuSelected : styles.menu}
        onClick={() => dispatch(updateSubCat("bottoms"))}
      >
        <p>Bottoms</p>
      </ListItem>
      <ListItem
        button
        className={
          selected === "dressSuits" ? styles.menuSelected : styles.menu
        }
        onClick={() => dispatch(updateSubCat("dressSuits"))}
      >
        {mainCat === "women" ? (
          <p>Dresses</p>
        ) : mainCat === "men" ? (
          <p>Suits</p>
        ) : (
          <p>Dresses | Suits</p>
        )}
      </ListItem>
      <ListItem
        button
        className={selected === "shoes" ? styles.menuSelected : styles.menu}
        onClick={() => dispatch(updateSubCat("shoes"))}
      >
        <p>Shoes</p>
      </ListItem>
    </List>
  );
};

export default CategoryMenu;
