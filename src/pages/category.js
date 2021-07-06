import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import WebHead from "../components/webHead";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import CategoryMenu from "../components/categoryMenu";
import { AppContext } from "../services/appProvider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import Link from "@material-ui/core/Link";
import _ from "lodash";
import styles from "../styles/category.module.scss";

const Category = ({ data }) => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [mainCat, setMainCat] = useState(null);
  const [subCat, setSubCat] = useState(null);
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    if (context.mainCat) {
      let name = `${context.mainCat
        .charAt(0)
        .toUpperCase()}${context.mainCat.slice(1)}`;
      setMainCat(name);

      let filtered = filterItemsForDisplay(data, context.mainCat);

      setItems(_.sortBy(filtered, "gender_id"));
    }
  }, []);

  useEffect(() => {
    if (context.mainCat && context.subCat) {
      let filMain = filterItemsForDisplay(data, context.mainCat);
      let filSub = filterSubCatItems(filMain, context.subCat);
      setItems(filMain);
      setFilteredItems(filSub);
    }
  }, [context.mainCat, context.subCat]);

  useEffect(() => {
    if (context.subCat && items) {
      let d = filterSubCatItems(items, context.subCat);
      setFilteredItems(d);
    }
  }, [context.subCat, items]);

  useEffect(() => {
    if (items) console.log(items);

    if (!filteredItems && mainCat && items) setFilteredItems(items);
  }, [items, filteredItems, mainCat]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/");
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
    console.log("mainCat", d);
    return d;
  };

  const filterSubCatItems = (data, subCat) => {
    let dataArr = [];

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

  return (
    <>
      <WebHead />
      <NavBar />

      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Home
        </Link>
        <h4 color="textPrimary">{mainCat}</h4>
      </Breadcrumbs> */}

      <div className={styles.mainContent}>
        <CategoryMenu />

        <div className={styles.list}>
          <GridList cols={4} spacing={12} cellHeight={550}>
            {filteredItems
              ? filteredItems.map((item, i) => (
                  <Grid key={i} item xs={12} sm={4} md={3} lg={3}>
                    <Card key={i}>
                      <CardActionArea>
                        <Link href="#" style={{ color: "#404040" }}>
                          <CardMedia
                            className={styles.cardMedia}
                            component="img"
                            alt={item.name}
                            image={item.img}
                            title={item.name}
                          />
                          <CardContent>
                            <h3>{item.name}</h3>
                          </CardContent>
                        </Link>
                      </CardActionArea>
                      <CardActions className={styles.actions}>
                        <button>Add to Cart</button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : null}
          </GridList>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Category;

export const getStaticProps = async () => {
  const url = "http://localhost:3000/assets/data.json";
  const getData = await fetch(url);
  const data = await getData.json();

  return { props: { data: data }, revalidate: 30 };
};
