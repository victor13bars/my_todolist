import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";

import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {
    AddTodolistACType,
    RemoveTodolistACType, SetTodolistsACType,
} from "./todolists-reducer";
import {setAppStatusAC, SetAppStatusACType} from "./app-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        default:
            return state;
    }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksACType =>
    ({type: 'SET-TASKS', tasks, todolistId})

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType =>
    ({type: 'REMOVE-TASK', taskId, todolistId})

export const addTaskAC = (task: TaskType): AddTaskACType => ({type: 'ADD-TASK', task})

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskACType =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId})

//thunks

export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error("task not found in the state");
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel).then(() => {
            const action = updateTaskAC(taskId, domainModel, todolistId)
            dispatch(action)
        })
    }
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type SetTasksACType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}
export type UpdateTaskACType = {
    type: 'UPDATE-TASK',
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
}
export type AddTaskACType = {
    type: 'ADD-TASK',
    task: TaskType
}

type ActionsType =
    RemoveTaskACType
    | SetTasksACType
    | AddTaskACType
    | UpdateTaskACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType>