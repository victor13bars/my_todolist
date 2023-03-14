import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {TaskStatuses} from "./api/todolists-api";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolists,
    FilterValuesType,
    removeTodolistTC
} from "./store/reducers/TodolistsSlice";
import {addTaskTC, removeTaskTC, updateTaskTC} from './store/reducers/TasksSlice';
import {changeTodolistFilterAC} from "./store/todolists-reducer";

export const TodolistsList: React.FC = () => {

    const todolists = useAppSelector(state =>state.todolists.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (!isLoggedIn) return

        dispatch(fetchTodolists())
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        const thunk = removeTaskTC({taskId, todolistId})
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC({todolistId, title})
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC({taskId, model: {status}, todolistId})
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        const thunk = updateTaskTC({taskId, model: {title}, todolistId})
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC({id, title})
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}

