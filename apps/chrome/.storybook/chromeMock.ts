// @ts-nocheck
import { fn } from 'storybook/test';

const createMockEvent = () => ({
  addListener: fn(),
  removeListener: fn(),
});

global.chrome = {
  tabs: {
    query: fn(),
    onCreated: createMockEvent(),
    onUpdated: createMockEvent(),
    onRemoved: createMockEvent(),
    onActivated: createMockEvent(),
  },
};
