import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TRegisterData, TLoginData } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  user: null,
  isLoading: true,
  isAuthChecked: false,
  error: null
};

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearAuthTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

const handleError = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    return (error as any).response?.data?.message || defaultMessage;
  } else {
    return defaultMessage;
  }
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(registerData);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, 'Ошибка при регистрации'));
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(loginData);
      setAuthTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, 'Ошибка при авторизации'));
    }
  }
);

export const getUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Ошибка при получении данных пользователя')
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(user);
      return data;
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Ошибка при обновлении данных пользователя')
      );
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      clearAuthTokens();
    } catch (error) {
      return rejectWithValue(
        handleError(error, 'Ошибка при выходе из системы')
      );
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthChecked = false;
      state.isLoading = false;
      state.error = null;
      clearAuthTokens();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export const { logoutUser } = userSlice.actions;

export const userSelectors = {
  selectUser: (state: { user: TUserState }) => state.user.user,
  selectIsAuthChecked: (state: { user: TUserState }) =>
    state.user.isAuthChecked,
  isLoadingSelector: (state: { user: TUserState }) => state.user.isLoading,
  errorSelector: (state: { user: TUserState }) => state.user.error
};

export const userSliceReducer = userSlice.reducer;
