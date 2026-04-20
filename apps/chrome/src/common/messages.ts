export enum MessageType {
  ConvertHtmlToMarkdown = 'convert_html_to_markdown',
}

export interface BaseRequestMessage {
  id: string;
  type: MessageType;
}

export interface BaseResponseMessage {
  id: string;
  type: MessageType;
}

export interface ConvertHtmlToMarkdownRequest extends BaseRequestMessage {
  type: MessageType.ConvertHtmlToMarkdown;
}

export interface ConvertHtmlToMarkdownResponse extends BaseResponseMessage {
  markdown: string;
}

export type RequestMessage = ConvertHtmlToMarkdownRequest;
