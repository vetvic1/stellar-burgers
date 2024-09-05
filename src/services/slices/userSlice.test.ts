import {
  userSliceReducer,
  registerUser,
  loginUser,
  getUser,
  logout,
  initialState
} from './userSlice';
import { TAuthResponse, TRegisterData } from '../../utils/burger-api';

describe('userSlice', () => {
  const requestId = 'test-request-id';
  const responseData: TAuthResponse = {
    success: true,
    refreshToken: 'fakeRefreshToken',
    accessToken: 'fakeAccessToken',
    user: { email: 'test@mail.com', name: 'test' }
  };
  const testUser: TRegisterData = {
    email: 'vet@mail.ru',
    name: 'Veta',
    password: 'password123'
  };

  it('должен установить isLoading в true при registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('должен установить пользователя и isAuthChecked в true при registerUser.fulfilled', () => {
    const state = userSliceReducer(
      initialState,
      registerUser.fulfilled(responseData, requestId, testUser)
    );
    expect(state.user).toEqual(responseData.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен установить isLoading в true при loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('должен установить пользователя и isAuthChecked в true при loginUser.fulfilled', () => {
    const state = userSliceReducer(
      initialState,
      loginUser.fulfilled(responseData, requestId, testUser)
    );
    expect(state.user).toEqual(responseData.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен установить isLoading в true при getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userSliceReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('должен установить isAuthChecked в true при getUser.fulfilled', () => {
    const state = userSliceReducer(
      initialState,
      getUser.fulfilled(responseData, requestId)
    );
    expect(state.user).toEqual(responseData.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен сбросить пользователя при logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userSliceReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
