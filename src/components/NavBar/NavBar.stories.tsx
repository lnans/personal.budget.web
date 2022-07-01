import { ComponentMeta, Story } from '@storybook/react'

import Navbar, { Props } from './NavBar'

const items = {
  dashboard: { path: 'item1', name: 'Item 1', icon: 'ri-dashboard-line' },
  accounts: { path: 'item2', name: 'Item 2', icon: 'ri-wallet-3-line' },
}

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {
    currentPath: {
      control: 'select',
      options: ['item1', 'item2'],
      defaultValue: 'item1',
    },
    routes: {
      table: {
        disable: true,
      },
    },
    onNavigate: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Navbar>

export const Component: Story<Omit<Props, 'routes'>> = (args) => <Navbar {...args} routes={items} />
