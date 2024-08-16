import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingridients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingridients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingridients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string | null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingridients = action.payload;
      });
  },
  selectors: {
    selectIngridients: (sliceState) => sliceState.ingridients,
    selectIsLoading: (sliceState) => sliceState.loading
  }
});

export const { selectIngridients, selectIsLoading } =
  ingredientsSlice.selectors;

export const ingridientsReducer = ingredientsSlice.reducer;
