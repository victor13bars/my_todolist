import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string,
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string,
    newTitle: string,
    todolistId: string
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {

        case'REMOVE-TASK': {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id != action.id);
            return {...state}
        }
        case "ADD-TASK": {
            const task = {id: v1(), title: action.title, isDone: false};
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = [task, ...todolistTasks];
            return {...state}
        }
        case "CHANGE-TASK-STATUS": {
            const todolistTasks = state[action.todolistId];
            const task = todolistTasks.find(t => t.id === action.id);
            if (task) task.isDone = action.isDone;
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            const todolistTasks = state[action.todolistId];
            const task = todolistTasks.find(t => t.id === action.id);
            if (task) task.title = action.newTitle;
            return {...state}
        }
        case "ADD-TODOLIST":
            return {[action.todolistId]: [], ...state}
        case "REMOVE-TODOLIST":
            delete state[action.id];
            return {...state}
        default:
            throw new Error('I dont understand type')
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId}
}