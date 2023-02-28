import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../api/todolists-api";

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginParamsType, thunkAPI) => {
        try {
            const response = await authAPI.login(data)
            return response.data
        } catch ({error: message}) {
            return thunkAPI.rejectWithValue(message ? message : 'failed')
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await authAPI.logout()
            return response.data
        } catch ({error: message}) {
            return thunkAPI.rejectWithValue(message ? message : 'failed')
        }
    }
)

export const initializeApp = createAsyncThunk(
    'auth/initializeApp',
    async (_, thunkAPI) => {
        try {
            const response = await authAPI.me()
            return response.data
        } catch ({error: message}) {
            return thunkAPI.rejectWithValue(message ? message : 'failed')
        }
    }
)