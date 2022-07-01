import { ComponentMeta, Story } from '@storybook/react'

import Card from './Card'

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>

export const Component: Story = () => (
  <Card>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>Card Exemple</div>
  </Card>
)
