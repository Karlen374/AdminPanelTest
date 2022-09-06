import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import Table from 'src/store/slices/tableSlice';
import Auth from 'src/store/slices/authorizationSlice';

export const store = configureStore({
  reducer: {
    Table,
    Auth,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
