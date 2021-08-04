import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import API from "../services/api";
import store from "store-js";
import _ from "lodash";
import moment from "moment";
import styles from "../styles/Checkout.module.scss";

const api = new API();

const OrderHistory = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setUserId(store.get("user_id"));
  }, []);

  useEffect(() => {
    if (userId) {
      api.queryOrderHistory(userId).then((res) => {
        // console.log(res);
        if (res && res.length > 0) {
          setHistory(res);
        } else return;
      });
    }
  }, [userId]);

  return (
    <div
      className={styles.checkout}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ margin: "0 60px 15px", alignSelf: "baseline" }}>
        Order History
      </h1>

      {history && history.length > 0 ? (
        _.map(history, (order) => (
          <TableContainer
            component={Paper}
            style={{ width: "90%", marginBottom: "80px" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.title}>
                    Order Date: {moment(order.date).format("YYYY MMM DD hh:mm")}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.orderItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      style={{ width: "30%" }}
                    >
                      <img src={item.img} alt={item.name} />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.size.toUpperCase()}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>HKD${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={styles.total}>
              <h3>Items Total: HKD${order.orderItems[0].totalPrice}</h3>
            </div>
          </TableContainer>
        ))
      ) : (
        <div style={{ marginTop: "50px" }}>
          <p style={{ textAlign: "center" }}>No order history.</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
