import { Dispatch } from "redux";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "../reducers/dataReducer";
import { AppThunk } from "../store";
import { RootState } from "../store";

export const fetchData = (): AppThunk<Promise<void>> => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(fetchDataStart());

      const apiUrl = process.env.REACT_APP_BASE_URL || "";
      const url = `${apiUrl}${`/users`}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error: any) {
      dispatch(fetchDataFailure(error));
    }
  };
};

export type FetchDataAction = ReturnType<typeof fetchData>;
