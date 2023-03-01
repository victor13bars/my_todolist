import {TaskType, todolistsAPI, TodolistType, UpdateTaskModelType} from "../../api/todolists-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UpdateDomainTaskModelType} from "../tasks-reducer";
import {setAppStatus} from "./AuthSlice";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type SetTasksType = {
    tasks: Array<TaskType>
    todolistId: string
}
export type RemoveTaskType = {
    taskId: string,
    todolistId: string
}
export type AddTaskType = {
    todolistId: string,
    title: string
}
export type UpdateTaskType = {
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk(
    'tasks/fetch',
    async (todolistId: string, {dispatch}) => {
        dispatch(setAppStatus('loading'))
        try {
            const response = await todolistsAPI.getTasks(todolistId)
            dispatch(setTasks({tasks: response.data.items, todolistId}))
            dispatch(setAppStatus('succeeded'))
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const addTaskTC = createAsyncThunk(
    'tasks/add',
    async (data: AddTaskType, {dispatch}) => {
        const {todolistId, title} = data
        dispatch(setAppStatus('loading'))
        try {
            const response = await todolistsAPI.createTask(todolistId, title)
            if (response.data.resultCode === 0) {
                dispatch(addTask(response.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const removeTaskTC = createAsyncThunk(
    'tasks/remove',
    async (data: RemoveTaskType, {dispatch}) => {
        const {taskId, todolistId} = data
        dispatch(setAppStatus('loading'))
        try {
            const response = await todolistsAPI.deleteTask(taskId, todolistId)
            if (response.data.resultCode === 0) {
                dispatch(removeTask({taskId, todolistId}))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)

export const updateTaskTC = createAsyncThunk(
    'tasks/update',
    async (data: UpdateTaskType, {dispatch, getState}) => {

        const {taskId, model, todolistId} = data

        const {tasks} = getState() as { tasks: TasksStateType }
        const task = tasks[todolistId].find((t: TaskType) => t.id === taskId)
        if (!task) {
            throw new Error("task not found in the store");
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }

        dispatch(setAppStatus('loading'))
        try {
            const response = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
            if (response.data.resultCode === 0) {
                dispatch(updateTask({taskId, model, todolistId}))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
    }
)


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<SetTasksType>) {
            const {tasks, todolistId} = action.payload
            state = {[todolistId]: tasks}
        },
        addTask(state, action: PayloadAction<TaskType>) {
            state = {[action.payload.todoListId]: [action.payload, ...state[action.payload.todoListId]]}
        },
        removeTask(state, action: PayloadAction<RemoveTaskType>) {
            const {taskId, todolistId} = action.payload
            state = {[action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        },
        updateTask(state, action: PayloadAction<UpdateTaskType>) {
            const {taskId, model, todolistId} = action.payload
            state = {
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
        },

    },
    extraReducers: {
        'todo/setTodolists': (state, action: PayloadAction<Array<TodolistType>>) => {
            action.payload.forEach((tl) => {
                state[tl.id] = []
            })
        },
        'todo/addTodolist': (state, action) => {
            state = {[action.todolist.id]: []}
        },
        'todo/removeTodolist': (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
    }
})

export const {
    setTasks,
    addTask,
    removeTask,
    updateTask
} = tasksSlice.actions

export default tasksSlice.reducer