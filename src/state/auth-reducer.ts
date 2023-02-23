import {Dispatch} from 'redux'
import {authAPI, LoginParamsType, todolistsAPI} from "../api/todolists-api";
import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {addTaskAC} from "./tasks-reducer";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        case "login/SET-IS-INITIALIZED-IN": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED-IN', value} as const)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        dispatch(setIsInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    })
}

type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | SetAppStatusACType
    | SetAppErrorACType