import { apiUrl, requestConfig } from "../utils/api";

const getOrders = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/orders/`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (id) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/orders/${id}`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateOrderStatus = async (id, data) => {
  const config = requestConfig("PATCH", data);
  try {
    const res = await fetch(`${apiUrl}/orders/status/${id}`, config);
    console.log(data);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const orderService = {
  getOrders,
  getOrderById,
  updateOrderStatus,
};

export default orderService;
