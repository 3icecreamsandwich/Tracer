import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
  breaks: false
})

markdown.disable('image')

const defaultLinkOpen = markdown.renderer.rules.link_open
markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrSet('target', '_blank')
  tokens[idx].attrSet('rel', 'noopener noreferrer')
  return defaultLinkOpen
    ? defaultLinkOpen(tokens, idx, options, env, self)
    : self.renderToken(tokens, idx, options)
}

const defaultTableOpen = markdown.renderer.rules.table_open
markdown.renderer.rules.table_open = (tokens, idx, options, env, self) => {
  const renderedTable = defaultTableOpen
    ? defaultTableOpen(tokens, idx, options, env, self)
    : self.renderToken(tokens, idx, options)
  return `<div class="markdown-table-wrap">${renderedTable}`
}

const defaultTableClose = markdown.renderer.rules.table_close
markdown.renderer.rules.table_close = (tokens, idx, options, env, self) => {
  const renderedTable = defaultTableClose
    ? defaultTableClose(tokens, idx, options, env, self)
    : self.renderToken(tokens, idx, options)
  return `${renderedTable}</div>`
}

export function renderMarkdownHtml(markdownSource: string): string {
  return markdown.render(markdownSource ?? '')
}
