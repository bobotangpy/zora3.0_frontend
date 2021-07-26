import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import CategoryMenu from "../components/categoryMenu";
import ItemList from "../components/itemList";
import _ from "lodash";
import styles from "../styles/Category.module.scss";
import API from "../services/api";

const api = new API();

const Category = ({ data }) => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [mainCat, setMainCat] = useState(null);
  const [subCat, setSubCat] = useState(null);
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    if (context.mainCat) {
      let name = `${context.mainCat
        .charAt(0)
        .toUpperCase()}${context.mainCat.slice(1)}`;
      setMainCat(name);

      let filtered = filterItemsForDisplay(data, context.mainCat);

      setItems(_.sortBy(filtered, "gender_id"));
      console.log("ccccc", context);
    }
  }, []);

  useEffect(() => {
    if (context.mainCat) {
      let filMain = filterItemsForDisplay(data, context.mainCat);
      setItems(filMain);

      if (!context.subCat && !context.style) {
        context.setSubCat("tops");
        context.setStyle("trending");
      }

      // if (context.subCat && context.style) {
      //   let filSub = filterSubCatItems(filMain, context.subCat);
      //   let filStyle = filterStyleItems(filSub, context.style);
      //   setFilteredItems(filStyle);
      //   return;
      // } else if (context.subCat && !context.style) {
      //   let filSub = filterSubCatItems(filMain, context.subCat);
      //   setFilteredItems(filSub);
      //   return;
      // } else if (context.style && !context.subCat) {
      //   let filSub = filterSubCatItems(filMain, context.subCat);
      //   let filStyle = filterStyleItems(filSub, context.style);
      //   setFilteredItems(filStyle);
      //   return;
      // }
      // console.log(context);
    }
  }, [context.mainCat, context.subCat, context.style]);

  useEffect(() => {
    if (items && !context.subCat && context.style) {
      context.setSubCat("tops");
    }

    if (items && context.subCat && !context.style) {
      let d = filterSubCatItems(items, context.subCat);
      return setFilteredItems(d);
    }

    if (items && context.subCat && context.style) {
      let d = filterSubCatItems(items, context.subCat);
      let d2 = filterStyleItems(d, context.style);
      return setFilteredItems(d2);
    }
  }, [context.style, context.subCat, items]);

  // useEffect(() => {
  //   if (items) console.log("items", items);
  //   //   if (!filteredItems && mainCat && items) setFilteredItems(items);
  // }, [items]);

  // useEffect(() => {
  //   if (filteredItems) console.log("filteredItems", filteredItems);
  // }, [filteredItems]);

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
        setGender(1);
        _.map(data, (item) => {
          if (item.gender_id === 1) dataArr.push(item);
        });
        break;
      case "men":
        setGender(0);
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

    switch (subCat) {
      case "dressSuits":
        _.map(data, (item) => {
          if (item.type_id == 0) dataArr.push(item);
        });
        if (gender && context.userSign) {
          api.querySuggestions(context.userSign, gender, 0).then((res) => {
            if (res && Array.isArray(res)) context.setDressSuitsData(res);
          });
        }
        break;
      case "shoes":
        _.map(data, (item) => {
          if (item.type_id == 1) dataArr.push(item);
        });
        if (gender && context.userSign) {
          api.querySuggestions(context.userSign, gender, 1).then((res) => {
            if (res && Array.isArray(res)) context.setShoesData(res);
          });
        }
        break;
      case "tops":
        _.map(data, (item) => {
          if (item.type_id == 2) dataArr.push(item);
        });
        if (gender && context.userSign) {
          api.querySuggestions(context.userSign, gender, 2).then((res) => {
            if (res && Array.isArray(res)) context.setTopsData(res);
          });
        }
        break;
      case "bottoms":
        _.map(data, (item) => {
          if (item.type_id == 3) dataArr.push(item);
        });
        if (gender && context.userSign) {
          api.querySuggestions(context.userSign, gender, 3).then((res) => {
            if (res && Array.isArray(res)) context.setBottomsData(res);
          });
        }
        break;
      default:
        break;
    }
    return dataArr;
  };

  const filterStyleItems = (data, style) => {
    console.log(data);
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
    console.log("style", dataArr);
    return dataArr;
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
  const url = "http://localhost:3000/assets/data.json";
  const getData = await fetch(url);
  const data = await getData.json();

  return { props: { data: data }, revalidate: 30 };
};
