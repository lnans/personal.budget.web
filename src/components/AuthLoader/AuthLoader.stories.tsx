import { ComponentMeta, Story } from '@storybook/react'

import AuthLoader from './AuthLoader'

export default {
  title: 'AuthLoader',
  component: AuthLoader,
} as ComponentMeta<typeof AuthLoader>

export const Component: Story = () => <AuthLoader />
