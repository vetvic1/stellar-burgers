import { rootReducer } from './store';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { userSliceReducer } from './slices/userSlice';
import { feedSliceReducer } from '../services/slices/feedSlice';
import { ordersSliceReduser } from './slices/ordersSlice';

describe('rootReducer', () => {
  test('возврат начального состояния хранилища при unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);
    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, action),
      burgerConstructor: burgerConstructorReducer(undefined, action),
      order: ordersSliceReduser(undefined, action),
      user: userSliceReducer(undefined, action),
      feed: feedSliceReducer(undefined, action)
    });
  });
});
