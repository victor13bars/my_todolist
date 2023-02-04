import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

const EditableSpan = ({value, onChange}: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode ?
            <input
                value={title}
                autoFocus
                onBlur={activateViewMode}
                onChange={onChangeHandler}
            />
            :
            <span onDoubleClick={activateEditMode}>{title}</span>
    );
};

export default EditableSpan;