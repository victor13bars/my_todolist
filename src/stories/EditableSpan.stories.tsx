import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
    onChange: action('EditableSpan value changed'),
};



