import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Suggestions from "../../components/suggestions";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import styles from "../../styles/ProductInfo.module.scss";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import API from "../../services/api";
import _ from "lodash";
import store from "store-js";
import { reduxStore } from "../../redux/_index";
import { useSelector } from "react-redux";

const api = new API();

const ProductInfo = ({ data }) => {
  const router = useRouter();
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (data) {
      setQuantity(1);
      console.log("states in store", reduxStore.getState());
    }
  }, []);

  useEffect(() => {
    if (size) console.log(size);
  }, [size]);

  const handleChange = (e) => {
    setSize(e.target.value);
  };

  const handleChangeQty = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };

  return (
    <>
      {data ? (
        <div className={styles.layout}>
          <div
            className="flexRow"
            style={{ height: "23px", marginLeft: "15px", cursor: "pointer" }}
          >
            <ArrowBackIosIcon />
            <p
              style={{ paddingTop: "5px" }}
              onClick={() =>
                router.push("/category", `/${mainCat}`, {
                  shallow: true,
                })
              }
            >
              Back
            </p>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <img src={data.img} alt={data.name} height={600} />
            </Grid>
            <Grid item xs={6}>
              <h2>{data.name}</h2>
              <h3>{data.price}</h3>

              <div className="flexRow" style={{ marginBottom: "20px" }}>
                <label htmlFor="outlined-size">Size :</label>
                <FormControl variant="outlined">
                  <NativeSelect
                    value={size}
                    onChange={handleChange}
                    inputProps={{
                      name: "size",
                      id: "outlined-size",
                    }}
                    className={styles.select}
                  >
                    {/* <option aria-label="None" value="" /> */}
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </NativeSelect>
                </FormControl>
              </div>

              <div className="flexRow">
                <label>Quantity :</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  className={styles.qty}
                  value={quantity}
                  onChange={handleChangeQty}
                />
              </div>

              <div style={{ marginTop: "50px" }}>
                <button>Add to Cart</button>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : null}

      {store.get("user_token") ? (
        <Suggestions displayItem={data.product_id} />
      ) : null}
    </>
  );
};

export default ProductInfo;

export const getStaticProps = async ({ params }) => {
  let data;

  await api.queryAllProducts().then((res) => {
    if (res && Array.isArray(res)) {
      // console.log(res);
      data = res;
    } else data = [];
  });

  const details = _.find(
    data,
    (item) => item.product_id.toString() === params.item
  );

  return {
    props: { data: details },
  };
};

export const getStaticPaths = async () => {
  let data;

  await api.queryAllProducts().then((res) => {
    if (res && Array.isArray(res)) {
      // console.log(res);
      data = res;
    } else data = [];
  });

  const paths = _.map(data, (item) => ({
    //        vvvv Must be SAME name as [<name>].js
    params: { item: item.product_id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};
