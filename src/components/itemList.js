import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import ImageList from "@material-ui/core/ImageList";
import Link from "@material-ui/core/Link";
import Popover from "@material-ui/core/Popover";
import styles from "../styles/ItemList.module.scss";
import { addToBag } from "../utilities/utils";
import { updateCart } from "../redux/cartSlice";
import SizeQty from "../components/sizeQty";
import _ from "lodash";

const Content = ({ item }) => {
  const router = useRouter();

  return (
    <Link
      // href={{ pathname: "/productInfo/[item]", query: { item: item.product_id } }}
      // href="/productInfo/[item]"
      // as={`/productInfo/${item.product_id}`
      style={{ color: "#404040" }}
      onClick={() =>
        router.push(`/productInfo/${item.product_id}`, undefined, {
          // shallow: true,
        })
      }
    >
      <CardMedia
        className={styles.cardMedia}
        component="img"
        alt={item.name}
        image={item.img}
        title={item.name}
      />
      <CardContent>
        <h3>{item.name}</h3>
        <p style={{ fontSize: "14px" }}>{item.price}</p>
      </CardContent>
    </Link>
  );
};

const ItemList = ({ items, suggestions }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

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
    <div className={styles.list}>
      <ImageList cols={4} gap={12} rowHeight={550}>
        {items.map((data, i) => (
          <Grid key={i} item xs={12} sm={4} md={3} lg={3}>
            <Card key={i}>
              {!suggestions ? (
                <>
                  <CardActionArea>
                    <Content item={data} />
                  </CardActionArea>
                  {/* FIXME: fix popover style */}
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
                  <CardActions className={styles.actions}>
                    <button id={data.product_id} onClick={handleOpen}>
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
    </div>
  );
};

export default ItemList;
