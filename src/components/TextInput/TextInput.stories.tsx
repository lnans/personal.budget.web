import { ComponentMeta, Story } from '@storybook/react'

import TextInput, { Props } from './TextInput'

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    label: {
      defaultValue: 'Input',
    },
    disabled: {
      defaultValue: false,
    },
    type: {
      defaultValue: 'text',
    },
    fullWidth: {
      defaultValue: false,
    },
    error: {
      defaultValue: '',
    },
    icon: {
      control: 'select',
      options: [undefined, 'ri-user-3-line', 'ri-shield-user-line', 'ri-lock-line'],
      defaultValue: undefined,
    },
    formControl: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TextInput>

export type ComponentProps = Omit<Props<unknown>, 'formControl' | 'name'>
export const Component: Story<ComponentProps> = (args) => <TextInput {...args} />
