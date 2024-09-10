import {
  getIngredients,
  initialState,
  ingredientsReducer
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  it('должен установить loading в true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('должен обработать getIngredients.fulfilled', () => {
    const testIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 10,
        calories: 200,
        price: 50,
        image: 'image_url',
        image_mobile: 'image_mobile_url',
        image_large: 'image_large_url'
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'bun',
        proteins: 30,
        fat: 10,
        carbohydrates: 15,
        calories: 300,
        price: 100,
        image: 'image_url',
        image_mobile: 'image_mobile_url',
        image_large: 'image_large_url'
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: testIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(testIngredients);
    expect(state.error).toBeNull();
  });

  it('должен обработать getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки данных' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBe('Ошибка загрузки данных');
  });
});
