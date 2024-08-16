import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, RequestStatus, TRegisterData, TLoginData } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
  requestStatus: RequestStatus;
};

const initialState: TUserState = {
  user: null,
  isLoading: true,
  isAuthChecked: false,
  error: null,
  requestStatus: RequestStatus.Idle
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      const { accessToken, refreshToken, user } = response;
      setCookie('accessToken', accessToken.split('Bearer ')[1], {
        expires: 3600
      });
      localStorage.setItem('refreshToken', refreshToken);
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      const { accessToken, refreshToken, user } = response;
      setCookie('accessToken', accessToken.split('Bearer ')[1], {
        expires: 3600
      });
      localStorage.setItem('refreshToken', refreshToken);
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(user);
      return response.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init(state) {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.error = null;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
        state.requestStatus = RequestStatus.Idle;
      });
  }
});

export const { init } = userSlice.actions;

export const userSelectors = {
  selectUser: (state: { user: TUserState }) => state.user.user,
  selectIsAuthChecked: (state: { user: TUserState }) =>
    state.user.isAuthChecked,
  selectRequestStatus: (state: { user: TUserState }) => state.user.requestStatus
};

export const userSliceReducer = userSlice.reducer;
