export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type TConstructorState = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

export type TBun = TIngredient;

export type TIngredientState = {
  buns: TIngredient[]; // Массив булочек
  mains: TIngredient[]; // Массив основных ингредиентов
  sauces: TIngredient[]; // Массив соусов
};

export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type TLoginData = {
  email: string;
  password: string;
};
