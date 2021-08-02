import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import CategoryMenu from "../components/categoryMenu";
import ItemList from "../components/itemList";
import _ from "lodash";
import styles from "../styles/Category.module.scss";
import API from "../services/api";

import { useDispatch, useSelector } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
import { updateSubCat } from "../redux/subCatSlice";
import { updateStyle } from "../redux/styleSlice";
import {
  updateTopsData,
  updateBottomsData,
  updateDressSuitsData,
  updateShoesData,
} from "../redux/productsDataSlice";
import { reduxStore } from "../redux/_index";

const api = new API();

const Category = ({ data }) => {
  const dispatch = useDispatch();
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const subCat = useSelector((state) => state.subCat.selectedSubCat);
  const style = useSelector((state) => state.style.selectedStyle);
  const userSign = useSelector((state) => state.auth.userSign);

  const context = useContext(AppContext);
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    /* mainCat lost after page refresh => updateMainCat */
    if (!mainCat) {
      window.location.pathname === "/men"
        ? dispatch(updateMainCat("men"))
        : window.location.pathname === "/women"
        ? dispatch(updateMainCat("women"))
        : dispatch(updateMainCat("horoscope"));
    }

    if (mainCat !== "horoscope" && !subCat && !style) {
      dispatch(updateSubCat("tops"));
      dispatch(updateStyle("trending"));
    } else if (mainCat === "horoscope" && !subCat) {
      dispatch(updateSubCat("tops"));
    }
    console.log("states in store", reduxStore.getState());
  }, []);

  useEffect(() => {
    if (mainCat && subCat) {
      let filtered = filterItemsForDisplay(data, mainCat);
      setItems(_.reverse(_.sortBy(filtered, "gender_id")));
      // console.log("filter", filtered);

      mainCat !== "horoscope"
        ? updateSuggestions(subCat, getGenderId(mainCat))
        : dispatch(updateStyle(null));
    }
  }, [mainCat]);

  useEffect(() => {
    /* When user only selected mainCat & style (Click navbar in homepage) */
    if (items && !subCat && style) {
      dispatch(updateSubCat("tops"));
    }

    if (items && subCat && !style) {
      if (mainCat !== "horoscope") {
        dispatch(updateStyle("trending"));
      } else {
        let filtered = filterSubCatItems(items, subCat);
        return setFilteredItems(filtered);
      }
    }

    if (items && subCat && style) {
      let d = filterSubCatItems(items, subCat);
      let d2 = filterStyleItems(d, style);
      return setFilteredItems(d2);
    }

    if (!items && mainCat && style) {
      let filtered = filterItemsForDisplay(data, mainCat);
      setItems(filtered);
    }
  }, [mainCat, subCat, style, items]);

  const getGenderId = (gender) => {
    if (gender === "men") {
      return 0;
    } else if (gender === "women") {
      return 1;
    }
  };

  const filterItemsForDisplay = (data, category) => {
    let dataArr = [];

    switch (category) {
      case "horoscope":
        _.map(data, (item) => {
          if (item.horoscope_id === context.monthSign) {
            dataArr.push(item);
          }
        });
        break;
      case "women":
        _.map(data, (item) => {
          if (item.gender_id === 1) dataArr.push(item);
        });
        break;
      case "men":
        _.map(data, (item) => {
          if (item.gender_id === 0) dataArr.push(item);
        });
        break;
      default:
        break;
    }
    // Remove duplicate items (same name)
    let d = _.filter(
      dataArr,
      (elm, i, arr) => arr.findIndex((item) => item.name === elm.name) === i
    );
    // console.log("mainCat", d);
    return d;
  };

  const filterSubCatItems = (data, subCat) => {
    let dataArr = [];

    if (mainCat !== "horoscope")
      updateSuggestions(subCat, getGenderId(mainCat));

    switch (subCat) {
      case "dressSuits":
        _.map(data, (item) => {
          if (item.type_id == 0) dataArr.push(item);
        });
        break;
      case "shoes":
        _.map(data, (item) => {
          if (item.type_id == 1) dataArr.push(item);
        });
        break;
      case "tops":
        _.map(data, (item) => {
          if (item.type_id == 2) dataArr.push(item);
        });
        break;
      case "bottoms":
        _.map(data, (item) => {
          if (item.type_id == 3) dataArr.push(item);
        });
        break;
      default:
        break;
    }
    return dataArr;
  };

  const filterStyleItems = (data, style) => {
    // console.log(data);
    let dataArr = [];

    switch (style) {
      case "trending":
        _.map(data, (item) => {
          if (item.style_id == 0) dataArr.push(item);
        });
        break;
      case "casual":
        _.map(data, (item) => {
          if (item.style_id == 1) dataArr.push(item);
        });
        break;
      case "formal":
        _.map(data, (item) => {
          if (item.style_id == 2) dataArr.push(item);
        });
        break;
      case "goingOut":
        _.map(data, (item) => {
          if (item.style_id == 3) dataArr.push(item);
        });
        break;
      default:
        break;
    }
    return dataArr;
  };

  const updateSuggestions = (subCat, genderId) => {
    let subCat_id;

    subCat === "dressSuits"
      ? (subCat_id = 0)
      : subCat === "shoes"
      ? (subCat_id = 1)
      : subCat === "tops"
      ? (subCat_id = 2)
      : subCat === "bottoms"
      ? (subCat_id = 3)
      : "";

    if (genderId !== null && userSign) {
      console.log(mainCat, genderId, subCat_id);
      api.querySuggestions(userSign, genderId, subCat_id).then((res) => {
        if (res && Array.isArray(res)) {
          subCat_id == 0
            ? dispatch(updateDressSuitsData(res))
            : subCat_id == 1
            ? dispatch(updateShoesData(res))
            : subCat_id == 2
            ? dispatch(updateTopsData(res))
            : subCat_id == 3
            ? dispatch(updateBottomsData(res))
            : "";
        }
      });
    }
  };

  return (
    <div className={styles.mainContent}>
      <CategoryMenu />

      {filteredItems ? <ItemList items={filteredItems} /> : null}
    </div>
  );
};

export default Category;

export const getStaticProps = async () => {
  let data;

  await api.queryAllProducts().then((res) => {
    if (res && Array.isArray(res)) {
      data = res;
    } else data = [];
  });

  return { props: { data: data }, revalidate: 30 };
};
