import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface ExtensionOptions {
  enableNotifications: boolean;
}

export const DEFAULT_OPTIONS: ExtensionOptions = {
  enableNotifications: true,
};

export const OPTIONS_STORAGE_KEY = 'extension_options';

interface OptionsContextType {
  options: ExtensionOptions;
  loadingOptions: boolean;
  savingOptions: boolean;
  updateOptions: (next: Partial<ExtensionOptions>) => Promise<void>;
}

const OptionsContext = createContext<OptionsContextType>({
  options: DEFAULT_OPTIONS,
  loadingOptions: true,
  savingOptions: false,
  updateOptions: async () => {},
});

export const useOptions = () => useContext(OptionsContext);

const readOptions = async (): Promise<ExtensionOptions> => {
  if (chrome.storage == null) {
    return DEFAULT_OPTIONS;
  }
  const result = await chrome.storage.sync.get(OPTIONS_STORAGE_KEY);
  const stored = result[OPTIONS_STORAGE_KEY] as ExtensionOptions | undefined;
  return { ...DEFAULT_OPTIONS, ...(stored ?? {}) };
};

const writeOptions = async (options: ExtensionOptions): Promise<void> => {
  if (chrome.storage == null) {
    return;
  }
  await chrome.storage.sync.set({ [OPTIONS_STORAGE_KEY]: options });
};

export const OptionsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<ExtensionOptions>(DEFAULT_OPTIONS);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [savingOptions, setSavingOptions] = useState(false);

  useEffect(() => {
    (async () => {
      setOptions(await readOptions());
      setLoadingOptions(false);
    })();
  }, []);

  const updateOptions = useCallback(
    async (next: Partial<ExtensionOptions>) => {
      setSavingOptions(true);
      try {
        const merged = { ...options, ...next };
        await writeOptions(merged);
        setOptions(merged);
      } finally {
        setSavingOptions(false);
      }
    },
    [options]
  );

  return (
    <OptionsContext.Provider value={{ options, loadingOptions, savingOptions, updateOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};
