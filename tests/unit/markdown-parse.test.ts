import { describe, expect, it } from 'vitest'
import { renderMarkdownHtml } from '../../src/composables/markdown/parse'

describe('renderMarkdownHtml', () => {
  it('renders inline markdown formatting instead of literal markers', () => {
    const html = renderMarkdownHtml('This is **bold**, _italic_, and `code`.')

    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>italic</em>')
    expect(html).toContain('<code>code</code>')
    expect(html).not.toContain('**bold**')
  })

  it('renders markdown tables with a scroll wrapper', () => {
    const html = renderMarkdownHtml([
      '| Topic | Status |',
      '| --- | --- |',
      '| Tables | Render correctly |'
    ].join('\n'))

    expect(html).toContain('<div class="markdown-table-wrap"><table>')
    expect(html).toContain('<thead>')
    expect(html).toContain('<tbody>')
    expect(html).toContain('<th>Topic</th>')
    expect(html).toContain('<td>Render correctly</td>')
  })

  it('escapes raw HTML instead of rendering executable elements', () => {
    const html = renderMarkdownHtml('<script>alert("xss")</script>')

    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('does not render unsafe javascript links', () => {
    const html = renderMarkdownHtml('[bad](javascript:alert(1))')

    expect(html).not.toContain('href="javascript:')
    expect(html).not.toContain("href='javascript:")
  })

  it('adds safe attributes to explicit links', () => {
    const html = renderMarkdownHtml('[docs](https://example.com)')

    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })
})
