// src/store/index.ts

import {
  configureStore,
  ThunkAction,
  Action,
  Dispatch,
} from "@reduxjs/toolkit";
import dataReducer from "../reducers/dataReducer";
import { fetchData, FetchDataAction } from "../actions/dataActions";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Refine the AppThunk type to use ThunkDispatch with the correct action type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;

export default store;
