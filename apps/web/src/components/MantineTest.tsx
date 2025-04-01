import { Button } from '@mantine/core';
import { ReactNode } from 'react';

export function MantineTest() {
  return (
    <div className="p-4 my-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-4">Mantine UI Test</h2>
      <p className="mb-4">This component tests the integration of Mantine UI with Tailwind CSS</p>
      <div className="flex gap-4">
        <Button>Mantine Button</Button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Tailwind Button</button>
      </div>
    </div>
  );
}
