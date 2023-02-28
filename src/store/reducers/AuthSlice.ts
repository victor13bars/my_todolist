import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp, login, logout} from "./AsyncActionCreators";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
    status: RequestStatusType
    error: string | null
}


export const initialState: initialStateType = {
    isLoggedIn: false,
    isInitialized: false,
    status: 'idle',
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setAppErrorAC(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.status = 'loading'
        },

        [login.fulfilled.type]: (state) => {
            state.isLoggedIn = true
            state.status = 'succeeded'
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [logout.pending.type]: (state) => {
            state.status = 'loading'
        },

        [logout.fulfilled.type]: (state) => {
            state.isLoggedIn = false
            state.status = 'succeeded'
        },
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [initializeApp.pending.type]: (state) => {
            state.status = 'loading'
        },

        [initializeApp.fulfilled.type]: (state) => {
            state.isInitialized = true
            state.isLoggedIn = true
            state.status = 'succeeded'
        },
        [initializeApp.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export default authSlice.reducer