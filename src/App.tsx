import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValueType
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    )
    // let [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: string) => {
        let filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id == todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title, isDone: false}
        setTasks([task, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {

                    let
                        tasksForTodoList = tasks

                    if (todolist.filter === 'active') {
                        tasksForTodoList = tasks.filter(task => task.isDone === false)
                    }

                    if (todolist.filter === 'completed') {
                        tasksForTodoList = tasks.filter(task => task.isDone === true)
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                    />

                })
            }
        </div>
    )
        ;
}

export default App;
