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

  it('repairs generated study-card LaTeX with a missing opening delimiter', () => {
    const html = renderMarkdownHtml(
      '\\displaystyle\\lim_{h\\to0}\\frac{f(x_0+h)-f(x_0)}{h}=\\pm\\infty$',
      { repairMath: true }
    )

    expect(html).toContain('katex')
    expect(html).toMatch(/^<p><span class="katex"/)
  })

  it('renders standalone LaTeX commands in study-card content', () => {
    const html = renderMarkdownHtml('\\frac{a}{b}', { repairMath: true })

    expect(html).toContain('katex')
    expect(html).toMatch(/^<p><span class="katex"/)
  })

  it('removes a dangling model-generated math fragment from a term', () => {
    const html = renderMarkdownHtml('Vertical tangent definition $\\', {
      repairMath: true
    })

    expect(html).toContain('Vertical tangent definition')
    expect(html).not.toContain('$')
    expect(html).not.toContain('\\')
  })

  it('does not repair currency or LaTeX inside inline code', () => {
    const html = renderMarkdownHtml('It costs $5 and use `\\frac{a}{b}` literally.', {
      repairMath: true
    })

    expect(html).toContain('It costs $5')
    expect(html).toContain('<code>\\frac{a}{b}</code>')
  })

  it('renders undelimited LaTeX command spans inside later-card prose', () => {
    const html = renderMarkdownHtml(
      'A sum of the form \\sum_{k=1}^{n} f(c_k)\\Delta x_k approximating area under a curve.',
      { repairMath: true }
    )

    expect(html).toContain('katex')
    expect(html).toContain('approximating area under a curve')
    expect(html).not.toContain('katex-error')
  })

  it('renders multiple undelimited formula spans without swallowing connecting prose', () => {
    const html = renderMarkdownHtml(
      '\\sum_{i=1}^{n} c a_i = c\\sum_{i=1}^{n} a_i and \\sum_{i=1}^{n}(a_i\\pm b_i)=\\sum a_i\\pm\\sum b_i.',
      { repairMath: true }
    )

    expect(html.match(/class="katex"/g)?.length).toBe(2)
    expect(html).toContain(' and ')
    expect(html).not.toContain('katex-error')
  })

  it('repairs missing braces and unmatched scalable delimiters before rendering', () => {
    const html = renderMarkdownHtml(
      '$\\text{If } f(x)=\\left(\\frac{x}{2}\\text{ then the expression is defined$',
      { repairMath: true }
    )

    expect(html).toContain('katex')
    expect(html).not.toContain('katex-error')
  })

  it('renders long formulas beyond the previous macro-expansion allowance', () => {
    const expression = Array.from({ length: 2_000 }, (_, index) => `x_{${index}}`).join('+')
    const html = renderMarkdownHtml(`$${expression}$`, { repairMath: true })

    expect(html).toContain('katex')
    expect(html).not.toContain('katex-error')
  })
})
