const initialState: initialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType): SetAppStatusACType => ({type: 'APP/SET-STATUS', status})
export const setAppErrorAC = (error: string | null): SetAppErrorACType => ({type: 'APP/SET-ERROR', error})


export type initialStateType = {
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorACType = {
    type: 'APP/SET-ERROR',
    error: string | null
}
export type SetAppStatusACType = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType
}
type ActionsType = SetAppStatusACType | SetAppErrorACType