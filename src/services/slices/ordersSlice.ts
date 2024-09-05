import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TOrdersState = {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrderBurger = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('orders/fetchOrderBurger', async (data, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(data);
    return response.order;
  } catch (error) {
    return rejectWithValue('Ошибка при создании заказа');
  }
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orders/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  } catch (error) {
    return rejectWithValue('Ошибка при получении заказа по номеру');
  }
});

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    return rejectWithValue('Ошибка при получении всех заказов');
  }
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderModalDataAction: (state, action: PayloadAction<TOrder | null>) => {
      state.order = action.payload;
    },
    clearOrderModalDataAction: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      })

      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const orderActions = ordersSlice.actions;

export const orderSelectors = {
  ordersSelector: (state: RootState) => state.order.orders,
  orderSelector: (state: RootState) => state.order.order,
  isLoadingSelector: (state: RootState) => state.order.isLoading,
  errorSelector: (state: RootState) => state.order.error
};

export const ordersSliceReduser = ordersSlice.reducer;
