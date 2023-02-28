import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET-TODOLIST": {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsACType =>
    ({type: 'SET-TODOLIST', todolists})

export const removeTodolistAC = (todolistId: string): RemoveTodolistACType =>
    ({type: 'REMOVE-TODOLIST', todolistId})

export const addTodolistAC = (todolist: TodolistType): AddTodolistACType =>
    ({type: 'ADD-TODOLIST', todolist})

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleACType =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title})


export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterACType =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter})

export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType): ChangeTodolistEntityStatusACType => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
})

export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(id, 'succeeded'))

            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types

export type AddTodolistACType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type SetTodolistsACType = {
    type: 'SET-TODOLIST',
    todolists: Array<TodolistType>
}
export type ChangeTodolistTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterACType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type ChangeTodolistEntityStatusACType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id: string,
    status: RequestStatusType
}

type ActionsType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsACType
    | ChangeTodolistEntityStatusACType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType>