import { useEffect } from "react";
import styles from "./CardOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../slices/order-slice";

const CardOrder = ({ product, tableID, quantity, status }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className={styles.cardItem}>
      <h3 className={styles.cardTitle}>{product}</h3>
      <p>
        <span>Quantidade:</span> <span className={styles.bold}>{quantity}</span>
      </p>
      <p>
        <span> Mesa</span>: <span className={styles.bold}>{tableID}</span>
      </p>
      <p>
        <span className={styles.bold}>Status: {status}</span>
      </p>
    </div>
  );
};

export default CardOrder;
