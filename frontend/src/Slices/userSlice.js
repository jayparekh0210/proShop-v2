import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCreadantials: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logout: (state, action) => {
      state.userInfo = action.payload;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
    },
  },
});

export default authSlice.reducer;
export const { setCreadantials, logout } = authSlice.actions;
