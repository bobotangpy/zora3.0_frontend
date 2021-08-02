import { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import styles from "../styles/Checkout.module.scss";
import _ from "lodash";

import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateCart, updateTotal } from "../redux/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.total);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (cartItems) {
      dispatch(updateTotal());
      setRows(cartItems);
    }
  }, []);

  useEffect(() => {
    if (rows) {
      dispatch(updateTotal());
      setRows(cartItems);
    }
  }, [cartItems]);

  const handleChangeQty = (e, id) => {
    let newQty = Number(e.target.value);
    let newArr = [];

    _.map(rows, (item) => {
      if (item.id === id) {
        let p = Number(item.price.split("$")[1]).toFixed(2);
        item = {
          ...item,
          qty: newQty,
          price: `HKD$${(p / item.qty) * newQty}`,
        };
        newArr.push(item);
      } else newArr.push(item);
    });

    dispatch(updateCart(newArr));
  };

  return (
    <>
      {rows && rows.length > 0 ? (
        <div className={styles.checkout}>
          <TableContainer>
            <Table className="" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.title}>ORDER SUMMARY</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row" align="center">
                      <img src={row.img} alt={row.name} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.size.toUpperCase()}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        className={styles.qty}
                        value={row.qty}
                        onChange={(e) => handleChangeQty(e, row.id)}
                      />
                    </TableCell>
                    <TableCell>{`HKD$${Number(row.price.split("$")[1]).toFixed(
                      2
                    )}`}</TableCell>
                    <TableCell className={styles.del}>
                      <DeleteForeverOutlinedIcon
                        onClick={() =>
                          dispatch(deleteItem({ id: row.id, size: row.size }))
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider light />
          <div className={styles.total}>
            <h3>Items Total: HKD${total}</h3>
            <button>Pay and Place Order</button>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <h3>Your bag is empty.</h3>
        </div>
      )}
    </>
  );
};

export default Checkout;
