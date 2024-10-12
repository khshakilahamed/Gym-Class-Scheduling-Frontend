import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  const accessToken = getFromLocalStorage(authKey) || undefined;
  const user = getUserInfo() || undefined;

  return {
    accessToken: accessToken,
    user: {
      userId: user?.userId,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    },
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action?.payload?.accessToken;
      state.user = action?.payload?.user;
    },
    userLoggedOut: (state, action) => {
      removeUserInfo(authKey);
      state.accessToken = action?.payload?.accessToken;
      state.user = action?.payload?.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
