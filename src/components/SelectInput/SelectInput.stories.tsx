import { ComponentMeta, Story } from '@storybook/react'

import SelectInput, { Props } from './SelectInput'

const items = [
  {
    id: '1',
    value: 'Item 1',
  },
  {
    id: '2',
    value: 'Item 2',
  },
]

export default {
  title: 'SelectInput',
  component: SelectInput,
  argTypes: {
    label: {
      defaultValue: 'Input',
    },
    disabled: {
      defaultValue: false,
    },
    fullWidth: {
      defaultValue: false,
    },
    error: {
      defaultValue: '',
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
    itemKey: {
      table: {
        disable: true,
      },
    },
    itemValue: {
      table: {
        disable: true,
      },
    },
    items: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof SelectInput>

export type ComponentProps = Omit<
  Props<unknown>,
  'itemValue' | 'itemKey' | 'items' | 'formControl' | 'name'
>
export const Component: Story<ComponentProps> = (args) => (
  <SelectInput {...args} items={items} itemKey='id' itemValue='value' />
)
