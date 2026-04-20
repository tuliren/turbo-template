import TurndownService from 'turndown';

const hasCodeAncestor = (node: TurndownService.Node) => {
  return node instanceof Element && node.closest('code');
};

const hasListItemAncestor = (node: TurndownService.Node) => {
  return node instanceof Element && node.closest('li');
};

export const getTurndownService = (): TurndownService => {
  return new TurndownService({
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    headingStyle: 'atx',
    strongDelimiter: '**',
  })
    .addRule('pre', {
      filter: 'pre',
      replacement: (content, node) => {
        if (hasCodeAncestor(node)) {
          return node.textContent ?? '';
        }
        if (hasListItemAncestor(node)) {
          return '`' + node.textContent + '`';
        } else {
          return '\n```\n' + node.textContent + '\n```\n';
        }
      },
    })
    .addRule('img', {
      filter: 'img',
      replacement: (content, node) => {
        const typedNode = node as HTMLImageElement;
        const alt = typedNode.alt || '';
        const src = typedNode.src || '';
        const fullImageUrl = new URL(src, window.location.href).href;
        return `{{image|alt=${alt}|src=${fullImageUrl}}}`;
      },
    })
    .remove(['footer', 'nav', 'head', 'header', 'script', 'style']);
};

export const DefaultTurndownService = getTurndownService();

export const getHtmlMarkdown = (html: string): string => {
  return DefaultTurndownService.turndown(html);
};
