import { useDispatch } from "react-redux";
import { deleteItem } from "../redux/cartSlice";
import styles from "../styles/CartItemList.module.scss";
import Divider from "@material-ui/core/Divider";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const CartItemList = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.content}>
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
                      onClick={
                        () =>
                          dispatch(deleteItem({ id: item.id, size: item.size }))
                        // deleteItem(item.id, item.size)
                      }
                    />
                  </p>
                </div>
              </div>
              <Divider light />
            </div>
          ))}
          <button
            style={{
              margin: "15px 0",
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            Checkout
          </button>
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
