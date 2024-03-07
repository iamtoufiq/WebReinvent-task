import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: number;
  email: string;
  first_name: string;
}

interface UserList {
  data: User[];
}

interface UserState {
  userData: UserList | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
}

// Define the initial state
const initialState: UserState = {
  userData: null,
  status: "idle",
  error: null,
  searchQuery: "",
};

// Async action to fetch user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const apiUrl = process.env.REACT_APP_BASE_URL || "";
    const url = `${apiUrl}${`/users`}`;
    const response = await fetch(url);
    const data: UserList = await response.json();
    return data;
  }
);

// Slice for user data
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<UserList>) => {
          state.status = "succeeded";
          state.userData = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(
        userSlice.actions.setSearchQuery,
        (state, action: PayloadAction<string>) => {
          state.searchQuery = action.payload;
          if (state.userData) {
            state.userData = {
              data: state.userData.data.filter(
                (user) =>
                  user.first_name
                    .toLowerCase()
                    .includes(action.payload.toLowerCase()) ||
                  user.email
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())
              ),
            };
          }
        }
      );
  },
});

export const { setSearchQuery } = userSlice.actions;

export default userSlice.reducer;
