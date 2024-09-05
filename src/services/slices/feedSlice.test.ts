import { feedSliceReducer, initialState, getFeeds } from './feedSlice';

describe('feedSlice', () => {
  it('должен установить isLoading в true при getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });
  it('должен обработать getFeeds.fulfilled', () => {
    const testPayload = {
      orders: [{ id: '1', name: 'Order 1' }],
      total: 100,
      totalToday: 10
    };
    const action = { type: getFeeds.fulfilled.type, payload: testPayload };
    const state = feedSliceReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(testPayload.orders);
    expect(state.total).toBe(testPayload.total);
    expect(state.totalToday).toBe(testPayload.totalToday);
    expect(state.error).toBeUndefined();
  });

  it('должен обработать getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Something went wrong' }
    };
    const state = feedSliceReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.error).toBe('Something went wrong');
  });
});
