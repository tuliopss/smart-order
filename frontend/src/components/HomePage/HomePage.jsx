import CardOrder from "../CardOrder/CardOrder";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../slices/order-slice";
import { useEffect } from "react";
import styles from "./HomePage.module.css";
import ModalOrder from "../CardOrder/ModalCardOrder";

const HomePage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className={styles.orderContainer}>
      {orders.length > 0 &&
        orders.map((order) => (
          <CardOrder
            key={order._id}
            product={order.product}
            tableID={order.tableID}
            quantity={order.quantity}
            status={order.status}
            id={order._id}
          />
        ))}
    </div>
  );
};

export default HomePage;
