export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

type initialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType): SetAppStatusACType => ({type: 'APP/SET-STATUS', status})

export type SetAppStatusACType = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType
}
type ActionsType = SetAppStatusACType