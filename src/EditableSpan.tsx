import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export function EditableSpan({value, onChange, disabled = false}: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode && !disabled ?
        <TextField
            variant="outlined"
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}
        />
        :
        <span onDoubleClick={activateEditMode}>
            {value}
        </span>
}
