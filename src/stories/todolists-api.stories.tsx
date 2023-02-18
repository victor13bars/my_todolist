import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('Have you good day')
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
        todolistsAPI.deleteTodolist(todolistId)
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
        todolistsAPI.updateTodolist(todolistId, 'TODAY GOOD')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTasks('9e617260-5c0a-4abb-982d-d409a6f7cc36')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.createTask('9e617260-5c0a-4abb-982d-d409a6f7cc36', 'ALL RIGHT')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.updateTask('9e617260-5c0a-4abb-982d-d409a6f7cc36', 'e497cbc7-f11f-48c7-b1bc-5b459955de13', {
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

        todolistsAPI.deleteTask('9e617260-5c0a-4abb-982d-d409a6f7cc36', 'c93a6353-ed48-4200-9d54-746c9c9809bb')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}