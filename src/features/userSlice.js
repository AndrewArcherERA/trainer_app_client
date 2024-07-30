import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
        bio: "",
    },
    isLoggedIn: false,
    loginError: "",
    loading: false,
};

const userSlice = createSlice({
  name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.data = initialState.data;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
