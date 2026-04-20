import { FC, useState } from 'react';

import LoadingPanel from '../common/LoadingPanel';
import { GlobalConfig } from '../common/globalConfig';
import { useTabs } from '../contexts/TabsContext';
import { UserProfileProvider, useUserProfile } from '../contexts/UserProfileContext';
import { useHtmlParser } from '../hooks/useHtmlParser';

type TabKey = 'main' | 'profile' | 'about';

const baseButton =
  'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60';

const primaryButton = `${baseButton} bg-blue-600 text-white hover:bg-blue-700`;
const lightRedButton = `${baseButton} bg-red-50 text-red-700 hover:bg-red-100`;

const inputClass =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50';

const MainTab: FC = () => {
  const { currentTab } = useTabs();
  const { parsing, getMarkdown } = useHtmlParser();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!currentTab?.id) {
      setError('No active tab');
      return;
    }
    setError(null);
    try {
      setContent(await getMarkdown(currentTab.id));
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-3">
      <p className="text-sm text-gray-500">
        Round-trip the active page through the content script and render the Turndown-converted
        markdown below.
      </p>
      <button
        type="button"
        onClick={handleExtract}
        disabled={parsing || !currentTab?.id}
        className={primaryButton}
      >
        {parsing ? 'Extracting…' : 'Extract page markdown'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <textarea
        value={content}
        readOnly
        rows={12}
        placeholder="Markdown will appear here."
        className={`${inputClass} resize-y font-mono text-xs`}
      />
    </div>
  );
};

const ProfileTab: FC = () => {
  const { profile, loading, saveProfile, clearProfile } = useUserProfile();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [email, setEmail] = useState(profile.email);
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <LoadingPanel />;
  }

  const dirty = displayName !== profile.displayName || email !== profile.email;

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile({ displayName, email });
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    await clearProfile();
    setDisplayName('');
    setEmail('');
  };

  return (
    <div className="mt-3 flex flex-col gap-3">
      <p className="text-sm text-gray-500">
        Stored locally in{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs text-gray-800">
          chrome.storage.local
        </code>
        . No network calls.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Display name</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.currentTarget.value)}
          placeholder="Ada Lovelace"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Email</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="ada@example.com"
          className={inputClass}
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !dirty}
          className={primaryButton}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={handleClear} className={lightRedButton}>
          Clear
        </button>
      </div>
    </div>
  );
};

const AboutTab: FC = () => {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <p className="text-sm">
        <strong>Chrome Extension Template</strong>
      </p>
      <p className="text-sm text-gray-500">
        Version {GlobalConfig.version} ({GlobalConfig.environment})
      </p>
      <button
        type="button"
        onClick={() => chrome.runtime.openOptionsPage()}
        className="self-start text-sm text-blue-600 underline-offset-2 hover:underline"
      >
        Open options
      </button>
    </div>
  );
};

const SidePanel: FC = () => {
  const [tab, setTab] = useState<TabKey>('main');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'main', label: 'Main' },
    { key: 'profile', label: 'Profile' },
    { key: 'about', label: 'About' },
  ];

  return (
    <UserProfileProvider>
      <div className="p-3">
        <h1 className="mb-3 text-base font-semibold text-gray-900">Chrome Extension Template</h1>
        <div className="flex border-b border-gray-200" role="tablist">
          {tabs.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {tab === 'main' && <MainTab />}
        {tab === 'profile' && <ProfileTab />}
        {tab === 'about' && <AboutTab />}
      </div>
    </UserProfileProvider>
  );
};

export default SidePanel;
