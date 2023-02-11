import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8eaba7cd-8849-4eb5-b90f-f5fda0cd9786'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{ item: TodolistType }>>(
            'todo-lists',
            {title},
        )
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`todo-lists/${todolistId}`,
            {title},
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(
            `todo-lists/${todolistId}`,
        )
        return promise
    }
}