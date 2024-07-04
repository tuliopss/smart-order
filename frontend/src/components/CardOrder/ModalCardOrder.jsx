import { useEffect, useRef, useState } from "react";
import styles from "./ModalCardOrder.module.css";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updateOrderStatus } from "../../slices/order-slice";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useToastMessage from "../../hooks/useToastMessage";
import ToastMessages from "../ToastMessages/ToastMessages";

function ModalOrder({ toggleModal, isOpen, id }) {
  const { order, success, loading, error, message } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const { notify } = useToastMessage();

  const [orderStatus, setOrderStatus] = useState(order.status);

  const totalPrice = order.quantity * order.price;

  useEffect(() => {
    if (isOpen && id) {
      dispatch(getOrderById(id));
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

    dispatch(updateOrderStatus(data)).then((result) => {
      if (result.type === "order/status/fulfilled") {
        notify("success", message);
      } else {
        notify("error", "Falha ao iniciar o pedido");
      }
    });
  };

  if (!isOpen) {
    return null;
  }

  if (loading) {
    return <p>Carregando...</p>;
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
            <button
              name='status'
              className={styles.btnStartPrep}
              onClick={handleUpdateStatusOrder}>
              {order.status == "RECEIVED"
                ? "Iniciar Preparação"
                : "Concluir pedido"}
            </button>
          </span>
        </p>
        <div>
          <ToastMessages />
        </div>
        <button onClick={() => toggleModal(false)}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalOrder;
