import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../services/appProvider";
import Suggestions from "../../components/suggestions";
import SizeQty from "../../components/sizeQty";
import SignIn from "../../components/signIn";
import Grid from "@material-ui/core/Grid";
// import FormControl from "@material-ui/core/FormControl";
// import NativeSelect from "@material-ui/core/NativeSelect";
import styles from "../../styles/ProductInfo.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Modal from "@material-ui/core/Modal";
import API from "../../services/api";
import _ from "lodash";
import store from "store-js";
import { reduxStore } from "../../redux/_index";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/cartSlice";
import { addToBag } from "../../utilities/utils";

const api = new API();

const SigninModal = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="signinModal"
    >
      <SignIn />
    </Modal>
  );
};

const ProductInfo = ({ data }) => {
  const router = useRouter();
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const mainCat = useSelector((state) => state.mainCat.selectedMainCat);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const [cartItems, setCartItems] = useState([]);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data) {
      setSize("xs");
      setQuantity(1);
      context.setLoading(false);
      console.log("states in store", reduxStore.getState());
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [cartItems]);

  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleChangeQty = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };

  const handleAddToBag = (
    productId,
    name,
    img,
    price,
    selectedSize,
    quantity
  ) => {
    setLoading(true);

    const newItem = {
      id: productId,
      name: name,
      img: img,
      price: price,
      size: selectedSize,
      qty: quantity,
    };

    let newCartItem = addToBag(newItem, cartItems);

    dispatch(updateCart(newCartItem));
  };

  return (
    <>
      {data && (
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

          <Grid container gap={2}>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <img src={data.img} alt={data.name} height={600} />
            </Grid>
            <Grid item xs={6}>
              <h2>{data.name}</h2>
              <h3>{data.price}</h3>

              <SizeQty
                size={size}
                quantity={quantity}
                handleChangeSize={handleChangeSize}
                handleChangeQty={handleChangeQty}
              />
              {/* <div className="flexRow" style={{ marginBottom: "20px" }}>
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
                  max={10}
                  className={styles.qty}
                  value={quantity}
                  onChange={handleChangeQty}
                />
              </div> */}

              <div style={{ marginTop: "50px" }}>
                <button
                  style={{ minWidth: "197px", background: "#fff" }}
                  disabled={loading}
                  onClick={() =>
                    store.get("user_id")
                      ? handleAddToBag(
                          data.product_id,
                          data.name,
                          data.img,
                          data.price,
                          size,
                          quantity
                        )
                      : setOpenModal(true)
                  }
                >
                  {loading ? <CircularProgress /> : "Add to Bag"}
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      {store.get("user_token") && <Suggestions displayItem={data.product_id} />}

      <SigninModal openModal={openModal} setOpenModal={setOpenModal} />
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
