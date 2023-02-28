import {combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice'
import {todolistAPI} from "../services/TodoService";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    authReducer,
    [todolistAPI.reducerPath]: todolistAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(todolistAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
