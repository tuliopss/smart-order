import { useEffect, useRef, useState } from "react";
import styles from "./ModalCardOrder.module.css";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updateOrderStatus } from "../../slices/order-slice";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useToastMessage from "../../hooks/useToastMessage";
import ToastMessages from "../ToastMessages/ToastMessages";

const ModalOrder = ({ toggleModal, isOpen, id }) => {
  const { order, success, loading, error, message } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const { notify } = useToastMessage();

  const [orderState, setOrderState] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  const fetchGetOrderById = (id) => {
    dispatch(getOrderById(id));
  };

  const fillOrderState = (order) => {
    setOrderState({
      product: order.product,
      quantity: order.quantity,
      status: order.status,
      price: order.price,
    });
  };

  useEffect(() => {
    if (isOpen && id) {
      fetchGetOrderById(id);
    }
  }, [isOpen, id, dispatch]);

  useEffect(() => {
    if (order && order._id === id) {
      fillOrderState(order);
      setTotalPrice(order.quantity * order.price);
    }
  }, [id, order]);

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
        orderStatus = status;
        break;
    }
    return orderStatus;
  };

  const handleUpdateStatusOrder = () => {
    const updatedStatus = changeStatusOrder(orderState.status);

    const data = {
      ...order,
      status: updatedStatus,
    };

    dispatch(updateOrderStatus(data)).then((result) => {
      setOrderState((prevState) => ({
        ...prevState,
        status: updatedStatus,
      }));

      if (success) {
        notify(success, message);
      } else {
        notify(error, message);
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
        <h3>{orderState.product}</h3>
        <p>
          <span>Quantidade: {orderState.quantity}</span>
        </p>
        <p>
          <span>Valor total: R${totalPrice}</span>
        </p>

        <p>
          <span>Status: {orderState.status}</span>
          <span>
            <button
              name='status'
              className={styles.btnStartPrep}
              onClick={handleUpdateStatusOrder}>
              {/* {orderState.status == "RECEIVED"
                ? "Iniciar Preparação"
                : "Concluir pedido"} */}
              {orderState.status == "RECEIVED"
                ? "Iniciar Preparação"
                : orderState.status == "PENDING"
                ? "Concluir pedido"
                : "Pedido já concluído"}
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
};

export default ModalOrder;
