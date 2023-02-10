import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";

export type TaskPropsType = {
    taskId: string
    todoId: string
    taskTitle: string
    taskStatus: boolean
    removeTask: (taskId: string, todoId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoId: string) => void
}

const Task = ({
                  taskId,
                  todoId,
                  taskTitle,
                  taskStatus,
                  removeTask,
                  changeTaskStatus,
                  changeTaskTitle
              }: TaskPropsType) => {
    const onClickHandler = () => removeTask(taskId, todoId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(taskId, newIsDoneValue, todoId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(taskId, newValue, todoId);
    }, [changeTaskTitle, taskId, todoId])
    return (
        <div className={taskStatus ? "is-done" : ""}>
            <Checkbox
                checked={taskStatus}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={taskTitle} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};

export default Task;