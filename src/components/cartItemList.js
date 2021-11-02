import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteItem } from "../redux/cartSlice";
import styles from "../styles/CartItemList.module.scss";
import Divider from "@material-ui/core/Divider";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const CartItemList = ({ items, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.content}>
      <CloseOutlinedIcon className={styles.close} onClick={handleClose} />
      {items.length > 0 ? (
        <>
          {items.map((item, i) => (
            <div key={i}>
              <div className={styles.itemWrapper}>
                <img src={item.img} style={{ width: "45%", height: "auto" }} />
                <div className={styles.textWrapper}>
                  <p style={{ fontWeight: "bold", marginTop: "3px" }}>
                    {item.price}
                  </p>
                  <p>{item.name}</p>
                  <p>Size: {item.size.toUpperCase()}</p>
                  <p>Quantity: {item.qty}</p>
                  <p className={styles.del}>
                    <DeleteForeverOutlinedIcon
                      onClick={() =>
                        dispatch(deleteItem({ id: item.id, size: item.size }))
                      }
                    />
                  </p>
                </div>
              </div>
              <Divider light />
            </div>
          ))}
          <Link href="/checkout">
            <button
              style={{
                margin: "15px 0",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              Checkout
            </button>
          </Link>
        </>
      ) : (
        <div style={{ marginTop: "50px" }}>
          <p style={{ textAlign: "center" }}>Your bag is empty.</p>
        </div>
      )}
    </div>
  );
};

export default CartItemList;
