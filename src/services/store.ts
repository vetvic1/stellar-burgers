import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingridientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { userSliceReducer } from './slices/userSlice';
import { feedSliceReducer } from '../services/slices/feedSlice';
import { ordersSliceReduser } from './slices/ordersSlice';

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: ordersSliceReduser,
  user: userSliceReducer,
  feed: feedSliceReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
