import { ComponentMeta, Story } from '@storybook/react'
import { ReactNode } from 'react'

import Button from './Button'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      defaultValue: false,
    },
    loading: {
      defaultValue: false,
    },
    fullWidth: {
      defaultValue: false,
    },
    small: {
      defaultValue: false,
    },
    outlined: {
      defaultValue: false,
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>

export const Component: Story<{ children: ReactNode }> = (args) => <Button {...args} />
Component.args = { children: 'Button' }
