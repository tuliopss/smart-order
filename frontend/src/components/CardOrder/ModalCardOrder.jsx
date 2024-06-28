import { useEffect, useRef, useState } from "react";
import styles from "./ModalCardOrder.module.css";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updateOrderStatus } from "../../slices/order-slice";

function ModalOrder({ toggleModal, isOpen, id }) {
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const totalPrice = order.quantity * order.price;

  useEffect(() => {
    if (isOpen && id) {
      dispatch(getOrderById(id));

      // calcTotalPrice(order.price, order.quantity);
    }
  }, [isOpen, id, dispatch]);

  const changeStatusOrder = (status) => {
    let orderStatus;
    switch (status) {
      case "RECEIVED":
        orderStatus = "PENDING";
        break;
      case "PENDING":
        orderStatus = "CONCLUDED";
        break;

      default:
        break;
    }
    return orderStatus;
  };

  const handleUpdateStatusOrder = () => {
    const data = {
      ...order,
      status: changeStatusOrder(order.status),
    };
    dispatch(updateOrderStatus(data));
    console.log("DATA", data);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div id={styles.modalContainer}>
      <div className={styles.fade} onClick={() => toggleModal(false)}></div>

      <div className={styles.modal}>
        <h2>Detalhes do Pedido</h2>
        <h3>{order.product}</h3>
        <p>
          <span>Quantidade: {order.quantity}</span>
        </p>
        <p>
          <span>Valor total: R${totalPrice}</span>
        </p>

        <p>
          <span>Status: {order.status}</span>{" "}
          <span>
            {order.status == "RECEIVED" ? (
              <button
                name='status'
                className={styles.btnStartPrep}
                onClick={handleUpdateStatusOrder}>
                Iniciar Preparação
              </button>
            ) : (
              <button className={styles.btnStartPrep}>Concluir pedido</button>
            )}
          </span>
        </p>
        <button onClick={() => toggleModal(false)}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalOrder;
