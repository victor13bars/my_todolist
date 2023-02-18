import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task was clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    ...baseArgs,
    task:{
        id: '1',
        todoListId: "todolistId2",
        title: 'React',
        description: 'some task',
        status: 0,
        priority: 1,
        startDate: '10.02.2022',
        deadline: 'tomorrow',
        order: 9,
        addedDate: ''
    },
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task:{
        id: '1',
        todoListId: "todolistId2",
        title: 'React',
        description: 'some task',
        status: 2,
        priority: 1,
        startDate: '10.02.2022',
        deadline: 'tomorrow',
        order: 9,
        addedDate: ''
    },
};



