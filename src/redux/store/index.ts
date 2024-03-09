import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dataReducer from "../reducers/dataReducer";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;

export default store;
