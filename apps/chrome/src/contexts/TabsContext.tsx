import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface TabsContextType {
  currentTab: chrome.tabs.Tab | null;
  tabs?: chrome.tabs.Tab[];
  currentTabId?: number;
  currentWindowId?: number;
}

export const DEFAULT_IGNORED_URLS = ['chrome://', 'chrome-extension://', 'file://'];

export const getSortedTabs = (tabs: chrome.tabs.Tab[], focusedWindowId?: number) => {
  return tabs
    .filter(
      (tab) =>
        tab.url != null &&
        !DEFAULT_IGNORED_URLS.some((urlToIgnore) => tab.url?.startsWith(urlToIgnore))
    )
    .sort((a, b) => {
      if (
        a.active &&
        a.windowId === focusedWindowId &&
        (!b.active || b.windowId !== focusedWindowId)
      ) {
        return -1;
      }
      if (
        b.active &&
        b.windowId === focusedWindowId &&
        (!a.active || a.windowId !== focusedWindowId)
      ) {
        return 1;
      }

      if (a.active && !b.active) {
        return -1;
      }
      if (!a.active && b.active) {
        return 1;
      }

      return (b.lastAccessed ?? 0) - (a.lastAccessed ?? 0);
    });
};

export const TabsContext = createContext<TabsContextType>({
  currentTab: null,
  tabs: [],
  currentTabId: undefined,
  currentWindowId: undefined,
});

export const useTabs = () => useContext(TabsContext);

interface TabsProviderProps {
  children: ReactNode;
}

export const TabsProvider: FC<TabsProviderProps> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [tabs] = useState<chrome.tabs.Tab[]>([]);
  const [currentWindowId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const queryTabs = async () => {
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length > 0) {
          setCurrentTab(tabs[0]);
        }
      } catch (error) {
        console.error('Failed to query tabs:', error);
      }
    };

    queryTabs();

    const tabUpdateListener = (
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      if (tab.active && changeInfo.status === 'complete') {
        setCurrentTab(tab);
      }
    };

    chrome.tabs.onUpdated.addListener(tabUpdateListener);

    return () => {
      chrome.tabs.onUpdated.removeListener(tabUpdateListener);
    };
  }, []);

  return (
    <TabsContext.Provider
      value={{
        currentTab,
        tabs,
        currentTabId: currentTab?.id,
        currentWindowId,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
