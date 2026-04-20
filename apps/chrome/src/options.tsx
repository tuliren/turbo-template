import { createRoot } from 'react-dom/client';

import { OptionsProvider } from './contexts/OptionsContext';
import Options from './options/Options';
import './styles/tailwind.css';

const root = createRoot(document.getElementById('options-root')!);

root.render(
  <OptionsProvider>
    <div className="mx-auto max-w-sm p-8">
      <Options />
    </div>
  </OptionsProvider>
);
