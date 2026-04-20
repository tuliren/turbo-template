import { devLog } from './common/logging';
import { getHtmlMarkdown } from './common/markdown';
import { ConvertHtmlToMarkdownResponse, MessageType, RequestMessage } from './common/messages';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const typedMessage = message as RequestMessage;
  if (typedMessage.type === MessageType.ConvertHtmlToMarkdown) {
    devLog('info', `[${typedMessage.id}] Converting HTML to Markdown...`);
    (async () => {
      const rawMarkdown = getHtmlMarkdown(document.body.innerHTML);
      const response: ConvertHtmlToMarkdownResponse = {
        id: typedMessage.id,
        type: typedMessage.type,
        markdown: rawMarkdown,
      };
      sendResponse(response);
    })();
  }
  return true;
});
