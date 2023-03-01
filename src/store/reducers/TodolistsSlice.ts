import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatus} from "./AuthSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type ChangeTodoTitleType = {
    id: string,
    title: string
}
export type ChangeTodoFilterType = {
    id: string,
    filter: FilterValuesType
}
export type ChangeTodoEntityStatusType = {
    id: string,
    status: RequestStatusType
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const initialState: Array<TodolistType> = []

export const fetchTodolists = createAsyncThunk(
    'todolists/fetch',
    async (_, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        try {
            const response = await todolistsAPI.getTodolists()
            dispatch(setTodolists(response.data))
            dispatch(setAppStatus('succeeded'))
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const addTodolistTC = createAsyncThunk(
    'todolists/add',
    async (title: string, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        try {
            const response = await todolistsAPI.createTodolist(title)
            if (response.data.resultCode === 0) {
                dispatch(addTodolist(response.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const removeTodolistTC = createAsyncThunk(
    'todolists/remove',
    async (todolistId: string, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
        try {
            const response = await todolistsAPI.deleteTodolist(todolistId)
            if (response.data.resultCode === 0) {
                dispatch(removeTodolist(todolistId))
                dispatch(setAppStatus('succeeded'))
                dispatch(changeTodolistEntityStatus({id: todolistId, status: 'succeeded'}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const changeTodolistTitleTC = createAsyncThunk(
    'todolists/changeTitle',
    async (data: ChangeTodoTitleType, {dispatch}) => {
        const {id, title} = data
        dispatch(setAppStatus('loading'))
        dispatch(changeTodolistEntityStatus({id, status: 'loading'}))
        try {
            const response = await todolistsAPI.updateTodolist(id, title)
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitle({id, title}))
                dispatch(setAppStatus('succeeded'))
                dispatch(changeTodolistEntityStatus({id, status: 'succeeded'}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const todolistsSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodolists(state, action: PayloadAction<Array<TodolistType>>) {
            state = action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        addTodolist(state, action) {
            state = [{...action.payload, filter: 'all', entityStatus: 'idle'}, ...state]

        },
        removeTodolist(state, action: PayloadAction<string>) {
            state = state.filter(el => el.id !== action.payload)
        },
        changeTodolistFilter(state, action: PayloadAction<ChangeTodoFilterType>) {
            const {id, filter} = action.payload
            state = state.map(tl => tl.id === id ? {...tl, filter} : tl)
        },
        changeTodolistTitle(state, action: PayloadAction<ChangeTodoTitleType>) {
            const {id, title} = action.payload
            state = state.map(tl => tl.id === id ? {...tl, title} : tl)
        },
        changeTodolistEntityStatus(state, action: PayloadAction<ChangeTodoEntityStatusType>) {
            const {id, status} = action.payload
            state = state.map(tl => tl.id === id ? {...tl, entityStatus: status} : tl)
        },
    }
})

export const {
    setTodolists,
    addTodolist,
    removeTodolist,
    changeTodolistEntityStatus,
    changeTodolistFilter,
    changeTodolistTitle
} = todolistsSlice.actions

export default todolistsSlice.reducer