import React, {useEffect, useState} from 'react'
import axios from "axios";
import {TaskPriorities, TaskStatuses, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8eaba7cd-8849-4eb5-b90f-f5fda0cd9786'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Have you good day')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4a32d216-86ba-4f48-b276-18b1b918dffd'
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9e617260-5c0a-4abb-982d-d409a6f7cc36'
        todolistAPI.updateTodolist(todolistId, 'TODAY GOOD')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTasks('9e617260-5c0a-4abb-982d-d409a6f7cc36')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTask('9e617260-5c0a-4abb-982d-d409a6f7cc36', 'ALL RIGHT')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.updateTask('9e617260-5c0a-4abb-982d-d409a6f7cc36', 'e497cbc7-f11f-48c7-b1bc-5b459955de13', {
            title: 'Test',
            description:'Test',
            status: 0,
            priority:0,
            startDate: '',
            deadline: ''
        })
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.deleteTask('9e617260-5c0a-4abb-982d-d409a6f7cc36', 'c93a6353-ed48-4200-9d54-746c9c9809bb')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}