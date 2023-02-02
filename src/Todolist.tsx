import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>,
    filter: FilterValueType,
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist({
                             id,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus
                             , filter
                         }: PropsType) {

    const [nameTask, setNameTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addNewTask = () => {
        if (nameTask.trim() !== '') {
            addTask(nameTask.trim())
            setNameTask('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNameTask(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask(nameTask)
        }
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

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={nameTask}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {tasks.map((task) => {
                    const onClickHandler = () => removeTask(task.id)
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        changeTaskStatus(task.id, newIsDoneValue)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
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
