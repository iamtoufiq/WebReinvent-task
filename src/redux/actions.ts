import { Dispatch } from "redux";

const SET_USER_DATA = "SET_USER_DATA";

interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: any; // Replace 'any' with the actual type of user data
}

// Action creator to set the user data
export const setUserData = (userData: any): SetUserDataAction => ({
  type: SET_USER_DATA,
  payload: userData,
});

// Async action creator to fetch data
export const fetchData = () => {
  return async (dispatch: Dispatch<SetUserDataAction>) => {
    try {
      // Simulate an API call
      const response = await fetch("https://reqres.in/api/users");
      const data = await response.json();

      // Dispatch the action with the fetched data
      dispatch(setUserData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
