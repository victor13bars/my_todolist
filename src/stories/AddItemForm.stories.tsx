import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const addNewTaskCallback = action('New task added')

const baseArgs = {
    addItem: addNewTaskCallback
}

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    ...baseArgs,
};



