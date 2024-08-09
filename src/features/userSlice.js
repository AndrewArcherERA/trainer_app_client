import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";

export const register = createAsyncThunk(
    "user/register",
    async (data, thunkAPI) => {
        const hashPass = bcrypt.hashSync(data.data.hashed_pass, 10);
        data.data.hashed_pass = hashPass;
        try{
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url:"http://localhost:8080/users/register",
                headers: {
                    Authorization: "Basic Og==",
                },
                data: data
            };
            const response = await axios.request(config);
        } catch (error){
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)


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
    extraReducers: (builder) => {
        builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload)
        state.error = action.payload;
        state.loading = false;
      })
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
