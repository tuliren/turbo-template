import { MantineProvider } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';

import Hero from '../../Hero';

const meta = {
  title: 'Web/Hero',
  component: Hero,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
