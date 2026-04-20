import { useState } from 'react';

import { sendMessageToTab } from '../common/chrome';
import { ConvertHtmlToMarkdownRequest, MessageType } from '../common/messages';

export const useHtmlParser = () => {
  const [parsing, setParsing] = useState(false);

  const getMarkdown = (tabId?: number): Promise<string> => {
    if (parsing) {
      return Promise.reject('Already parsing');
    }

    setParsing(true);
    const message: ConvertHtmlToMarkdownRequest = {
      id: new Date().toISOString(),
      type: MessageType.ConvertHtmlToMarkdown,
    };

    const handleSendMessage = async (tabId: number) => {
      console.debug(`[${message.id}] Request parsing HTML in tab ${tabId}...`);
      try {
        let markdown = await sendMessageToTab(tabId, message);
        setParsing(false);
        return markdown;
      } catch (error) {
        setParsing(false);
        throw error;
      }
    };

    if (tabId != null) {
      return handleSendMessage(tabId);
    }

    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        const activeTab = tabs[0];
        if (activeTab && activeTab.id) {
          handleSendMessage(activeTab.id).then(resolve).catch(reject);
        } else {
          setParsing(false);
          reject('No active tab found');
        }
      });
    });
  };

  return { parsing, getMarkdown };
};
