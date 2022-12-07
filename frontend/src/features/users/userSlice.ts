import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userService from "./userService";

const user = JSON.parse(localStorage.getItem('user')!)

interface UserState {
    user: string | null,
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    message: string
}

const initialState: UserState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk('auth/login', async (user: {username: string, password: string}, thunkAPI) => {
    try {
        return await userService.login(user)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await userService.logout();
});

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // @ts-ignore
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = userSlice.actions;
export default userSlice.reducer