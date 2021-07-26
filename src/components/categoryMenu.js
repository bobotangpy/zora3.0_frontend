import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from "../styles/CategoryMenu.module.scss";

const CategoryMenu = () => {
  const context = useContext(AppContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      // console.log(selected);
      context.setSubCat(selected);
    }
  }, [selected]);

  return (
    <List component="nav" className={styles.list}>
      <ListItem
        button
        className={selected === "tops" ? styles.menuSelected : styles.menu}
        onClick={() => setSelected("tops")}
      >
        <p>Tops</p>
      </ListItem>
      <ListItem
        button
        className={selected === "bottoms" ? styles.menuSelected : styles.menu}
        onClick={() => setSelected("bottoms")}
      >
        <p>Bottoms</p>
      </ListItem>
      <ListItem
        button
        className={
          selected === "dressSuits" ? styles.menuSelected : styles.menu
        }
        onClick={() => setSelected("dressSuits")}
      >
        {context.mainCat === "women" ? (
          <p>Dresses</p>
        ) : context.mainCat === "men" ? (
          <p>Suits</p>
        ) : (
          <p>Dresses | Suits</p>
        )}
      </ListItem>
      <ListItem
        button
        className={selected === "shoes" ? styles.menuSelected : styles.menu}
        onClick={() => setSelected("shoes")}
      >
        <p>Shoes</p>
      </ListItem>
    </List>
  );
};

export default CategoryMenu;
