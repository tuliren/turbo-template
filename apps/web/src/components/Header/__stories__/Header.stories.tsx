import { MantineProvider } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Header from '../../Header';

const meta = {
  title: 'Web/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
