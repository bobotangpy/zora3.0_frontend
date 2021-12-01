import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import ItemList from "./itemList";
import styles from "../styles/ProductInfo.module.scss";
import _ from "lodash";

import { useSelector } from "react-redux";

const Suggestions = ({ displayItem }) => {
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const subCat = useSelector((state) => state.subCat.selectedSubCat);
  const topsData = useSelector((state) => state.productsData.topsData);
  const bottomsData = useSelector((state) => state.productsData.bottomsData);
  const dressSuitsData = useSelector(
    (state) => state.productsData.dressSuitsData
  );
  const shoesData = useSelector((state) => state.productsData.shoesData);
  const context = useContext(AppContext);
  const [tops, setTops] = useState(null);
  const [bottoms, setBottoms] = useState(null);
  const [dressSuits, setDressSuits] = useState(null);
  const [shoes, setShoes] = useState(null);

  useEffect(() => {
    if (topsData) setTops(trimData(topsData));
    if (bottomsData) setBottoms(trimData(bottomsData));
    if (dressSuitsData) setDressSuits(trimData(dressSuitsData));
    if (shoesData) setShoes(trimData(shoesData));
  }, []);

  const trimData = (dataArr) => {
    // Remove item of the same name
    let uniqueArr = _.filter(
      dataArr,
      (item) => item.product_id !== displayItem
    );
    console.log("suggestions:", uniqueArr);
    if (uniqueArr.length > 4) return uniqueArr.slice(0, 4);
    else return uniqueArr;
  };

  return (
    <>
      {mainCat !== "horoscope" && (
        <>
          <h3 style={{ marginLeft: "50px", marginTop: "80px", color: "#fff" }}>
            Other {context.userSign}s also liked:
          </h3>
          <div className={styles.suggestions}>
            {mainCat !== "horoscope" &&
              (tops || bottoms || dressSuits || shoes) && (
                <>
                  <ItemList
                    items={
                      subCat === "tops"
                        ? tops
                        : subCat === "bottoms"
                        ? bottoms
                        : subCat === "dressSuits"
                        ? dressSuits
                        : subCat === "shoes"
                        ? shoes
                        : []
                    }
                    suggestions={true}
                  />
                </>
              )}
          </div>
        </>
      )}
    </>
  );
};

export default Suggestions;
