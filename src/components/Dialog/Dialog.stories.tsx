import { ComponentMeta, Story } from '@storybook/react'

import Dialog, { Props } from './Dialog'

export default {
  title: 'Dialog',
  component: Dialog,
  argTypes: {
    title: {
      defaultValue: 'Dialog',
      control: 'text',
    },
    open: {
      defaultValue: true,
    },
    onClose: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Dialog>

export const Component: Story<Props> = (args) => <Dialog {...args} />
Component.args = { children: 'Dialog' }
