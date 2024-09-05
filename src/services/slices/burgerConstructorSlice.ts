import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  RequestStatus
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { orderBurgerApi } from '../../utils/burger-api';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  order: TOrder | null;
  error: string | null;
  requestStatus: RequestStatus;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  error: null,
  requestStatus: RequestStatus.Idle
};

export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'burgerConstructor/orderBurger',
  async (ingredientIds) => (await orderBurgerApi(ingredientIds)).order
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    sortingIngredients: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    clearConstructor: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.requestStatus = RequestStatus.Success;
          state.bun = initialState.bun;
          state.ingredients = initialState.ingredients;
        }
      )
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectConstructorsItems: (state) => state,
    selectConstructorsRequest: (state) => state.requestStatus,
    selectConstructorsOrder: (state) => state.order
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorsItems,
  selectConstructorsRequest,
  selectConstructorsOrder
} = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  sortingIngredients,
  clearConstructor
} = burgerConstructorSlice.actions;
