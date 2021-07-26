import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
import ItemList from "./itemList";

const Suggestions = () => {
  const context = useContext(AppContext);
  const [topsData, setTopsData] = useState(null);
  const [bottomsData, setBottomsData] = useState(null);
  const [dressSuitsData, setDressSuitsData] = useState(null);
  const [shoesData, setShoesData] = useState(null);

  useEffect(() => {
    console.log("ccccc", context);

    if (context.topsData) setTopsData(context.topsData);
    if (context.bottomsData) setBottomsData(context.bottomsData);
    if (context.dressSuitsData) setDressSuitsData(context.dressSuitsData);
    if (context.shoesData) setShoesData(context.shoesData);
  }, []);

  return (
    <div>
      <h3>Other {context.userSign}s also liked:</h3>

      <ItemList
        items={
          context.subCat === "tops"
            ? topsData
            : context.subCat === "bottoms"
            ? bottomsData
            : context.subCat === "dressSuits"
            ? dressSuitsData
            : context.subCat === "shoes"
            ? shoesData
            : []
        }
      />
    </div>
  );
};

export default Suggestions;
