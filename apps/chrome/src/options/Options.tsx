import { FC } from 'react';

import LoadingPanel from '../common/LoadingPanel';
import { useOptions } from '../contexts/OptionsContext';

const Options: FC = () => {
  const { options, loadingOptions, savingOptions, updateOptions } = useOptions();

  if (loadingOptions) {
    return <LoadingPanel />;
  }

  return (
    <div className="mt-3 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900">Extension Options</h2>
      <p className="text-sm text-gray-500">
        Persisted to{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">
          chrome.storage.sync
        </code>{' '}
        under key{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">extension_options</code>
        .
      </p>
      <label className="flex items-center gap-2 text-sm text-gray-800">
        <input
          type="checkbox"
          checked={options.enableNotifications}
          onChange={(event) => updateOptions({ enableNotifications: event.currentTarget.checked })}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        Enable notifications
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={savingOptions}
          onClick={() => updateOptions(options)}
          className="inline-flex max-w-[150px] items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {savingOptions ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Options;
