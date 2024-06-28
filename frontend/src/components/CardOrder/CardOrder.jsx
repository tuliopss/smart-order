import { useEffect, useState } from "react";
import styles from "./CardOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, getOrders } from "../../slices/order-slice";
import { Link } from "react-router-dom";
import ModalCardOrder from "./ModalCardOrder";
import Button from "react-bootstrap/esm/Button";
import ModalOrder from "./ModalCardOrder";

const CardOrder = ({ id, product, tableID, quantity, status, price }) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(getOrderById(id));
  // }, [dispatch]);

  const toggleModal = (display) => {
    setIsModalOpen(display);
  };

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

      <button onClick={() => toggleModal(true)}>Ver detalhes</button>
      <ModalOrder toggleModal={toggleModal} isOpen={isModalOpen} id={id} />
    </div>
  );
};

export default CardOrder;
