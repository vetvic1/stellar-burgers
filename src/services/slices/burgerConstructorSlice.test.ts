import {
  addIngredient,
  removeIngredient,
  sortingIngredients,
  burgerConstructorReducer,
  initialState,
  TBurgerConstructorState
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  const IngredientBun: TConstructorIngredient = {
    id: '123',
    _id: '123',
    name: 'Булка1',
    type: 'bun',
    proteins: 50,
    calories: 220,
    carbohydrates: 110,
    fat: 12,
    price: 100.55,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  const IngredientMain: TConstructorIngredient = {
    id: '456',
    _id: '456',
    name: 'Начинка1',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };
  const IngredientSauce: TConstructorIngredient = {
    id: '789',
    _id: '789',
    name: 'Соус1',
    type: 'sauce',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  it('добавляем булку', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(IngredientBun)
    );
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toEqual({
      ...IngredientBun,
      id: expect.any(String)
    });
  });

  it('добавляем начинку', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(IngredientMain)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...IngredientMain,
      id: expect.any(String)
    });
  });

  it('добавляем соус', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(IngredientSauce)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...IngredientSauce,
      id: expect.any(String)
    });
  });

  it('удаляем ингредиент', () => {
    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(IngredientBun)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  test('изменение порядка ингредиентов', () => {
    const preloadedState: TBurgerConstructorState = {
      ...initialState,
      ingredients: [IngredientMain, IngredientSauce]
    };
    const newState = burgerConstructorReducer(
      preloadedState,
      sortingIngredients({ from: 0, to: 1 })
    );
    expect(newState.ingredients).toEqual([IngredientSauce, IngredientMain]);
  });
});
