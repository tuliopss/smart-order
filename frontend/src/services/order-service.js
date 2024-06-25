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
    const res = await fetch(`${api}/student/${id}`, config);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const orderService = {
  getOrders,
  getOrderById,
};

export default orderService;
