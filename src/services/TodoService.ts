import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

export const todolistAPI = createApi({
    reducerPath: 'todolistAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://social-network.samuraijs.com/api/1.1/'}),
    endpoints: (build) => ({
        me: build.query<ResponseType<UserType>, void>({
            query: () => ({
                url: 'auth/me'
            })
        }),
    })
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type UserType = {
    id: number
    email: string
    login: string
}