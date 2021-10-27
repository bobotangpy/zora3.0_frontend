import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToBag } from "../utilities/utils";
import { AppContext } from "../services/appProvider";
import { updateCart } from "../redux/cartSlice";
import SizeQty from "../components/sizeQty";
import SignIn from "./signIn";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import ImageList from "@material-ui/core/ImageList";
import Link from "@material-ui/core/Link";
import Popover from "@material-ui/core/Popover";
import Modal from "@material-ui/core/Modal";
import styles from "../styles/ItemList.module.scss";
import _ from "lodash";
import store from "store-js";

const Content = ({ item }) => {
  const router = useRouter();
  const context = useContext(AppContext);

  return (
    <Link
      // href={{ pathname: "/productInfo/[item]", query: { item: item.product_id } }}
      // href="/productInfo/[item]"
      // as={`/productInfo/${item.product_id}`
      style={{ color: "#404040" }}
      onClick={() => {
        context.setLoading(true);
        router.push(`/productInfo/${item.product_id}`, undefined, {
          // shallow: true,
        });
      }}
    >
      <CardMedia
        className={styles.cardMedia}
        component="img"
        alt={item.name}
        image={item.img}
        title={item.name}
      />
      <CardContent>
        <h3 style={{ lineHeight: "1.3rem" }}>{item.name}</h3>
        <p style={{ fontSize: "14px" }}>{item.price}</p>
      </CardContent>
    </Link>
  );
};

const SigninModal = React.forwardRef(({ openModal, setOpenModal }, ref) => {
  return (
    <Modal
      ref={ref}
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="signinModal"
    >
      <SignIn />
    </Modal>
  );
});

const ItemList = ({ items, suggestions }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(event.currentTarget.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleChangeQty = (e) => {
    setQuantity(e.target.value);
  };

  const confirmAdd = () => {
    let data = _.filter(items, (item) => {
      return item.product_id == selectedItem;
    });

    const newItem = {
      id: data[0].product_id,
      name: data[0].name,
      img: data[0].img,
      price: data[0].price,
      size: size || "xs",
      qty: quantity,
    };
    // console.log(newItem);
    let newCartItem = addToBag(newItem, cartItems);
    dispatch(updateCart(newCartItem));
    handleClose();
  };

  return (
    <div
      className={styles.list}
      style={suggestions ? { height: "500px" } : { height: "initial" }}
    >
      <ImageList
        cols={4}
        gap={12}
        rowHeight={550}
        className={suggestions ? "suggestionImgList" : "imgList"}
      >
        {items.map((data, i) => (
          <Grid key={i} item xs={12} sm={suggestions ? 3 : 4} md={3} lg={3}>
            <Card key={i} className={suggestions ? "suggestionCards" : "cards"}>
              {!suggestions ? (
                <>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <SizeQty
                      compo={"popover"}
                      size={size}
                      quantity={quantity}
                      handleChangeSize={handleChangeSize}
                      handleChangeQty={handleChangeQty}
                    />
                    <button className={styles.popoverAdd} onClick={confirmAdd}>
                      Add
                    </button>
                  </Popover>

                  <CardActionArea>
                    <Content item={data} />
                  </CardActionArea>

                  <CardActions className={styles.actions}>
                    <button
                      id={data.product_id}
                      onClick={(e) =>
                        store.get("user_id")
                          ? handleOpen(e)
                          : setOpenModal(true)
                      }
                    >
                      Add to Cart
                    </button>
                  </CardActions>
                </>
              ) : (
                <CardActionArea>
                  <Content item={data} />
                </CardActionArea>
              )}
            </Card>
          </Grid>
        ))}
      </ImageList>

      <SigninModal
        // props={(openModal, setOpenModal)}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default ItemList;
