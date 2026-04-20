import { ConvertHtmlToMarkdownResponse, MessageType, RequestMessage } from './messages';

export const sendMessageToTab = (tabId: number, message: RequestMessage): Promise<string> => {
  if (!Object.values(MessageType).includes(message.type as MessageType)) {
    return Promise.reject(`Invalid message type: ${message.type}`);
  }

  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      const typedResponse = response as ConvertHtmlToMarkdownResponse | undefined | null;
      if (typedResponse != null && typedResponse.markdown != null) {
        resolve(typedResponse.markdown);
      } else {
        reject(`Failed to convert tab ${tabId} to Markdown`);
      }
    });
  });
};
