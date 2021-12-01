import { useContext, useEffect, useState } from "react";
import { AppContext } from "../services/appProvider";
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

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#ffffff",
  margin:
    typeof window !== "undefined" && window.innerWidth == 768
      ? "50px"
      : "50px 120px",
};

const blackFont = {
  color: "#000000",
};

const api = new API();

const OrderHistory = () => {
  const context = useContext(AppContext);
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setUserId(store.get("user_id"));
  }, []);

  useEffect(() => {
    if (userId) {
      context.setLoading(true);
      api
        .queryOrderHistory(userId)
        .then((res) => {
          console.log(res);
          if (res && res.length > 0) {
            setHistory(res);
          } else return;
        })
        .catch((err) => {
          console.log("Query order history err:::", err);
        })
        .finally(() => context.setLoading(false));
    }
  }, [userId]);

  return (
    <div className={styles.history} style={wrapperStyle}>
      <h1 style={{ margin: "0 60px 15px", alignSelf: "baseline" }}>
        Order History
      </h1>

      {history && history.length > 0 ? (
        _.map(history, (order, i) => (
          <TableContainer
            key={i}
            component={Paper}
            style={{ width: "90%", marginBottom: "80px" }}
          >
            <Table className={styles.historyTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={styles.title}
                    colSpan={2}
                    style={blackFont}
                  >
                    Order Date: {moment(order.date).format("YYYY MMM DD hh:mm")}
                  </TableCell>
                  <TableCell style={blackFont}>Size</TableCell>
                  <TableCell style={blackFont}>Quantity</TableCell>
                  <TableCell style={blackFont}>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.orderItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      style={{ width: "30%", color: "#000000" }}
                    >
                      <img src={item.products.img} alt={item.products.name} />
                    </TableCell>
                    <TableCell style={blackFont}>
                      {item.products.name}
                    </TableCell>
                    <TableCell style={blackFont}>
                      {item.size.toUpperCase()}
                    </TableCell>
                    <TableCell style={blackFont}>{item.quantity}</TableCell>
                    <TableCell style={blackFont}>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={styles.total} style={blackFont}>
              <h3>Items Total: HKD${order.orderItems[0].total}</h3>
            </div>
          </TableContainer>
        ))
      ) : (
        <div style={{ marginTop: "50px" }}>
          {!context.loading && (
            <p style={{ textAlign: "center" }}>No order history.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
