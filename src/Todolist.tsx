import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    removeTodolist: (id: string) => void,
    tasks: Array<TaskType>,
    filter: FilterValueType,
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export function Todolist({
                             id,
                             title,
                             removeTodolist,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             changeTaskTitle,
                             changeTodolistTitle
                             , filter
                         }: PropsType) {


    const add = (title: string) => {
        addTask(title, id)
    }

    const onAllClickHandler = (id: string) => {
        changeFilter('all', id)
    }

    const onActiveClickHandler = (id: string) => {
        changeFilter('active', id)
    }

    const onCompletedClickHandler = (id: string) => {
        changeFilter('completed', id)
    }

    const onChaneTodoTitle = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return <div>
        <h3>
            <EditableSpan value={title} onChange={onChaneTodoTitle}/>
            <button onClick={() => removeTodolist(id)}>✖</button>
        </h3>
        <AddItemForm addItem={add}/>
        <ul>
            {tasks.map((task) => {
                    const onClickHandler = () => removeTask(task.id, id)
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        changeTaskStatus(task.id, newIsDoneValue, id)
                    }
                    const onChangeTitleHandler = (title: string) => {
                        changeTaskTitle(task.id, title, id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={task.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                }
            )}
        </ul>
        <div>
            <button
                className={filter === 'all' ? 'active-filter' : ''}
                onClick={() => onAllClickHandler(id)}
            >
                All
            </button>
            <button
                className={filter === 'active' ? 'active-filter' : ''}
                onClick={() => onActiveClickHandler(id)}
            >
                Active
            </button>
            <button
                className={filter === 'completed' ? 'active-filter' : ''}
                onClick={() => onCompletedClickHandler(id)}
            >
                Completed
            </button>
        </div>
    </div>
}
