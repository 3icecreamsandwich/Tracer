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

  it('renders inline and block LaTeX with KaTeX', () => {
    const html = renderMarkdownHtml(['Inline $E=mc^2$.', '', '$$', '\\frac{a}{b}', '$$'].join('\n'))

    expect(html).toContain('katex')
    expect(html).toContain('math-block')
    expect(html).not.toContain('$E=mc^2$')
  })

  it('renders generated math fences and LaTeX environments with KaTeX', () => {
    const html = renderMarkdownHtml([
      '```latex',
      '\\frac{a}{b}',
      '```',
      '',
      '\\begin{aligned}',
      'a &= b + c',
      '\\end{aligned}'
    ].join('\n'))

    expect(html).toContain('katex')
    expect(html.match(/math-block/g)?.length).toBe(2)
    expect(html).not.toContain('<code class="language-latex">')
  })

  it('renders display math delimiters even when generated inline with text', () => {
    const html = renderMarkdownHtml([
      'Use \\[a^2 + b^2 = c^2\\] for right triangles.',
      '',
      'Also parse $$\\Delta G = -RT\\ln K$$ in a paragraph.'
    ].join('\n'))

    expect(html).toContain('katex')
    expect(html.match(/math-display-inline/g)?.length).toBe(2)
    expect(html).not.toContain('\\[a^2 + b^2 = c^2\\]')
    expect(html).not.toContain('$$\\Delta G = -RT\\ln K$$')
  })
})
