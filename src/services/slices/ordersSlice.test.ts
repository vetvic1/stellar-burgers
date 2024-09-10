import {
  ordersSliceReduser,
  fetchOrderBurger,
  initialState
} from './ordersSlice';
import { TOrder } from '../../utils/types';

describe('ordersSlice reducer', () => {
  test('должен установить isLoading в true при fetchOrderBurger.pending', () => {
    const action = { type: fetchOrderBurger.pending.type };
    const state = ordersSliceReduser(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('должен обработать fetchOrderBurger.fulfilled', () => {
    const testOrder: TOrder = {
      _id: 'order123',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T12:00:00Z',
      updatedAt: '2023-01-01T12:00:00Z',
      number: 12345,
      ingredients: ['ingredient1', 'ingredient2']
    };
    const action = {
      type: fetchOrderBurger.fulfilled.type,
      payload: testOrder
    };
    const state = ordersSliceReduser(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(testOrder);
    expect(state.error).toBeNull();
  });

  test('должен обработать fetchOrderBurger.rejected', () => {
    const action = {
      type: fetchOrderBurger.rejected.type,
      payload: 'Ошибка при отправке заказа'
    };
    const state = ordersSliceReduser(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.order).toBeNull();
    expect(state.error).toBe('Ошибка при отправке заказа');
  });
});
