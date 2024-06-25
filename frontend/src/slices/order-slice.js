import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import orderService from "../services/order-service";

const initialState = {
  order: {},
  orders: [],
  success: false,
  loading: false,
  message: null,
};

export const getOrders = createAsyncThunk(
  "order/getAll",
  async (_, thunkAPI) => {
    // the underline says to redux that the first argument its unnecessary

    const data = await orderService.getOrders();

    return data;
  }
);

export const getOrderById = createAsyncThunk(
  "order/getById",
  async (id, thunkAPI) => {
    const data = await orderService.getOrderById(id);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error.message);
    }

    return data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  },
});

export const { resetMessage } = orderSlice.actions;
export default orderSlice.reducer;
