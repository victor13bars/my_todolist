import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET-TODOLIST": {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
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


export const fetchTodolistsTC = (): any => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string): any => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string): any => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(id, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
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

type ActionsType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistsACType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}