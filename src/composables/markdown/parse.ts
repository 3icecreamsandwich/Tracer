import MarkdownIt from 'markdown-it'
import katex from 'katex'

const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
  breaks: false
})

markdown.disable('image')

export type RenderMarkdownOptions = {
  repairMath?: boolean
}

const standaloneLatexCommand =
  /^\\(?:begin|displaystyle|left)(?![A-Za-z])/

const implicitLatexCommand =
  /\\(?:sum|prod|int|oint|lim|frac|dfrac|tfrac|sqrt|Delta|delta|theta|alpha|beta|gamma|pi|infty|partial|nabla|pm|mp|times|cdot|div|leq?|geq?|neq|approx|equiv|to|Rightarrow|Leftarrow|iff|text|operatorname|vec|mathbf|mathrm|mathbb|mathcal|overline|underline)(?![A-Za-z])|\\\|/g

const implicitLatexStopWords = [
  ' and ',
  ' approximating ',
  ' exists',
  ' where ',
  ' when ',
  ' which ',
  ' used ',
  ' means ',
  ' is ',
  ' are ',
  ' gives ',
  ' denotes ',
  ' provided '
]

function isEscapedAt(source: string, index: number) {
  let backslashCount = 0
  for (let i = index - 1; i >= 0 && source[i] === '\\'; i -= 1) {
    backslashCount += 1
  }
  return backslashCount % 2 === 1
}

function singleDollarIndexes(source: string) {
  const indexes: number[] = []
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] !== '$' || isEscapedAt(source, i)) continue
    if (source[i - 1] === '$' || source[i + 1] === '$') continue
    indexes.push(i)
  }
  return indexes
}

function looksLikeLatex(source: string) {
  return (
    /\\(?:begin|displaystyle|dfrac|frac|tfrac|lim|sum|prod|int|oint|sqrt|text|operatorname|left|right|pm|infty|to|vec|mathbf|mathrm|mathbb|mathcal|overline|underline|partial|nabla)(?![A-Za-z])/.test(source) ||
    /(?:[_^]\s*(?:\{|\w)|\\[a-zA-Z]+\s*\{)/.test(source)
  )
}

function implicitLatexEnd(source: string, commandStart: number) {
  if (source.startsWith('\\|', commandStart)) {
    const pairedDelimiter = source.indexOf('\\|', commandStart + 2)
    if (pairedDelimiter >= 0) return pairedDelimiter + 2
  }

  let braceDepth = 0
  for (let i = commandStart; i < source.length; i += 1) {
    const ch = source[i]
    if (ch === '{' && !isEscapedAt(source, i)) {
      braceDepth += 1
      continue
    }
    if (ch === '}' && !isEscapedAt(source, i)) {
      braceDepth = Math.max(0, braceDepth - 1)
      continue
    }
    if (braceDepth > 0) continue

    if (ch === ',' || ch === ';' || ch === '.') return i
    const rest = source.slice(i).toLowerCase()
    if (implicitLatexStopWords.some((word) => rest.startsWith(word))) return i
  }
  return source.length
}

function wrapImplicitLatex(source: string) {
  let output = ''
  let cursor = 0
  implicitLatexCommand.lastIndex = 0

  while (true) {
    const match = implicitLatexCommand.exec(source)
    if (!match) break
    if (match.index < cursor) continue

    let start = match.index
    while (start > cursor && /[A-Za-z0-9_()[\]{}.+\-*/=<>|']/.test(source[start - 1] ?? '')) {
      start -= 1
    }

    const end = implicitLatexEnd(source, match.index)
    const expression = source.slice(start, end).trimEnd()
    if (!expression) continue

    output += source.slice(cursor, start)
    output += `$${expression}$`
    cursor = start + expression.length
    implicitLatexCommand.lastIndex = Math.max(end, cursor)
  }

  output += source.slice(cursor)
  return output
}

function repairMathTextSegment(source: string) {
  // Models sometimes escape Markdown math delimiters as \$...\$. Keep escaped
  // currency intact, but restore delimiter pairs that clearly contain LaTeX.
  source = source.replace(/\\\$([^\n]+?)\\\$/g, (match, content: string) =>
    looksLikeLatex(content) ? `$${content}$` : match
  )

  // A recurring malformed model response leaves "$\" at the end of the term
  // and begins its definition with the actual LaTeX command.
  let repaired = source.replace(/\s+\$\\\s*$/, '')
  const dollars = singleDollarIndexes(repaired)

  if (dollars.length === 0) {
    const leadingWhitespace = repaired.match(/^\s*/)?.[0] ?? ''
    const trimmed = repaired.trim()
    if (standaloneLatexCommand.test(trimmed)) {
      return `${leadingWhitespace}$${trimmed}$`
    }
    return wrapImplicitLatex(repaired)
  }

  if (dollars.length !== 1) return repaired

  const dollarIndex = dollars[0]!
  const before = repaired.slice(0, dollarIndex)
  const after = repaired.slice(dollarIndex + 1)

  if (!after.trim()) {
    const commandIndex = before.search(/\\(?:begin|displaystyle|dfrac|frac|tfrac|lim|sum|prod|int|oint|sqrt|text|operatorname|left|vec|mathbf|mathrm|mathbb|mathcal|overline|underline|partial|nabla)(?![A-Za-z])/)
    if (commandIndex >= 0 && looksLikeLatex(before.slice(commandIndex))) {
      return `${before.slice(0, commandIndex)}$${before.slice(commandIndex)}$`
    }
    return repaired
  }

  if (looksLikeLatex(after)) {
    return `${repaired}$`
  }

  return repaired
}

function repairMathOutsideInlineCode(line: string) {
  let repaired = ''
  let textStart = 0
  let codeStart = -1

  for (let i = 0; i < line.length; i += 1) {
    if (line[i] !== '`' || isEscapedAt(line, i)) continue
    if (codeStart < 0) {
      repaired += repairMathTextSegment(line.slice(textStart, i))
      codeStart = i
    } else {
      repaired += line.slice(codeStart, i + 1)
      codeStart = -1
      textStart = i + 1
    }
  }

  if (codeStart >= 0) {
    repaired += line.slice(codeStart)
  } else {
    repaired += repairMathTextSegment(line.slice(textStart))
  }
  return repaired
}

export function repairStudyMathMarkdown(source: string) {
  let fenceMarker: '`' | '~' | null = null

  return source
    .split('\n')
    .map((line) => {
      const fence = /^\s*(`{3,}|~{3,})/.exec(line)
      if (fence) {
        const marker = fence[1]![0] as '`' | '~'
        if (fenceMarker === null) fenceMarker = marker
        else if (fenceMarker === marker) fenceMarker = null
        return line
      }
      return fenceMarker === null ? repairMathOutsideInlineCode(line) : line
    })
    .join('\n')
}

function balanceLatexBraces(source: string) {
  let depth = 0
  let repaired = ''
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i]!
    if (ch === '{' && !isEscapedAt(source, i)) {
      depth += 1
      repaired += ch
      continue
    }
    if (ch === '}' && !isEscapedAt(source, i)) {
      if (depth === 0) continue
      depth -= 1
      repaired += ch
      continue
    }
    repaired += ch
  }
  return `${repaired}${'}'.repeat(depth)}`
}

function repairLatexSyntax(source: string) {
  let repaired = balanceLatexBraces(source.trim())

  // JSON-oriented model output occasionally doubles command backslashes even
  // after transport decoding. Collapse only recognized commands so genuine
  // TeX line breaks remain untouched.
  repaired = repaired.replace(
    /\\\\(?=(?:begin|end|displaystyle|left|right|sum|prod|int|oint|lim|frac|dfrac|tfrac|sqrt|Delta|delta|theta|alpha|beta|gamma|pi|infty|partial|nabla|pm|mp|times|cdot|div|leq?|geq?|neq|approx|equiv|to|Rightarrow|Leftarrow|iff|text|operatorname|vec|mathbf|mathrm|mathbb|mathcal|overline|underline)(?![A-Za-z]))/g,
    '\\'
  )

  const leftCount = repaired.match(/\\left\b/g)?.length ?? 0
  const rightCount = repaired.match(/\\right\b/g)?.length ?? 0
  if (leftCount !== rightCount) {
    repaired = repaired.replace(/\\(?:left|right)\b/g, '')
  }

  const begins = [...repaired.matchAll(/\\begin\{([a-zA-Z*]+)\}/g)].map((match) => match[1]!)
  for (const environment of begins.reverse()) {
    const end = `\\end{${environment}}`
    if (!repaired.includes(end)) repaired += end
  }

  return repaired
}

function renderMath(source: string, displayMode: boolean) {
  const options = {
    displayMode,
    strict: 'ignore' as const,
    trust: false,
    maxExpand: 10_000
  }
  const repaired = repairLatexSyntax(source)
  const candidates = repaired === source.trim() ? [source] : [source, repaired]

  for (const candidate of candidates) {
    try {
      return katex.renderToString(candidate, {
        ...options,
        throwOnError: true
      })
    } catch {
    }
  }

  try {
    return katex.renderToString(repaired, {
      ...options,
      throwOnError: false
    })
  } catch {
    return `<code>${markdown.utils.escapeHtml(repaired)}</code>`
  }
}

function findDelimiterEnd(src: string, close: string, from: number) {
  let end = src.indexOf(close, from)
  while (end >= 0) {
    let backslashCount = 0
    for (let i = end - 1; i >= 0 && src[i] === '\\'; i -= 1) {
      backslashCount += 1
    }
    if (backslashCount % 2 === 0) return end
    end = src.indexOf(close, end + close.length)
  }
  return -1
}

markdown.inline.ruler.before('escape', 'math_inline', (state, silent) => {
  const start = state.pos
  const src = state.src
  let marker = ''
  let close = ''
  let displayMode = false

  if (src.startsWith('\\\\(', start)) {
    marker = '\\\\('
    close = '\\\\)'
  } else if (src.startsWith('\\\\[', start)) {
    marker = '\\\\['
    close = '\\\\]'
    displayMode = true
  } else if (src.startsWith('\\(', start)) {
    marker = '\\('
    close = '\\)'
  } else if (src.startsWith('\\[', start)) {
    marker = '\\['
    close = '\\]'
    displayMode = true
  } else if (src.startsWith('$$', start)) {
    marker = '$$'
    close = '$$'
    displayMode = true
  } else if (src[start] === '$' && src[start + 1] !== '$') {
    marker = '$'
    close = '$'
  } else {
    return false
  }

  const contentStart = start + marker.length
  const end = findDelimiterEnd(src, close, contentStart)
  if (end < 0) return false

  const content = src.slice(contentStart, end).trim()
  if (!content) return false
  if (!silent) {
    const token = state.push(displayMode ? 'math_display_inline' : 'math_inline', 'math', 0)
    token.content = content
    token.markup = marker
  }
  state.pos = end + close.length
  return true
})

markdown.block.ruler.before('fence', 'math_block', (state, startLine, endLine, silent) => {
  const start = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]
  const line = state.src.slice(start, max).trim()
  let marker = ''
  let close = ''

  if (line.startsWith('$$')) {
    marker = '$$'
    close = '$$'
  } else if (line.startsWith('\\\\[')) {
    marker = '\\\\['
    close = '\\\\]'
  } else if (line.startsWith('\\[')) {
    marker = '\\['
    close = '\\]'
  } else {
    return false
  }

  const firstContent = line.slice(marker.length)
  const sameLineEnd = firstContent.indexOf(close)
  if (sameLineEnd >= 0 && firstContent.slice(0, sameLineEnd).trim()) {
    if (!silent) {
      const token = state.push('math_block', 'math', 0)
      token.block = true
      token.content = firstContent.slice(0, sameLineEnd).trim()
      token.markup = marker
      token.map = [startLine, startLine + 1]
    }
    state.line = startLine + 1
    return true
  }

  const content: string[] = []
  if (firstContent.trim()) content.push(firstContent)
  let nextLine = startLine + 1
  for (; nextLine < endLine; nextLine += 1) {
    const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
    const lineMax = state.eMarks[nextLine]
    const next = state.src.slice(lineStart, lineMax)
    const closeIndex = next.indexOf(close)
    if (closeIndex >= 0) {
      const beforeClose = next.slice(0, closeIndex)
      if (beforeClose.trim()) content.push(beforeClose)
      if (!silent) {
        const token = state.push('math_block', 'math', 0)
        token.block = true
        token.content = content.join('\n').trim()
        token.markup = marker
        token.map = [startLine, nextLine + 1]
      }
      state.line = nextLine + 1
      return true
    }
    content.push(next)
  }

  return false
})

markdown.block.ruler.before('fence', 'math_environment_block', (state, startLine, endLine, silent) => {
  const start = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]
  const line = state.src.slice(start, max).trim()
  const match = /^\\begin\{([a-zA-Z*]+)\}/.exec(line)
  if (!match) return false

  const envName = match[1]
  const close = `\\end{${envName}}`
  const content: string[] = [line]

  if (line.includes(close)) {
    if (!silent) {
      const token = state.push('math_block', 'math', 0)
      token.block = true
      token.content = line
      token.markup = `\\begin{${envName}}`
      token.map = [startLine, startLine + 1]
    }
    state.line = startLine + 1
    return true
  }

  for (let nextLine = startLine + 1; nextLine < endLine; nextLine += 1) {
    const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
    const lineMax = state.eMarks[nextLine]
    const next = state.src.slice(lineStart, lineMax)
    content.push(next)
    if (!next.includes(close)) continue

    if (!silent) {
      const token = state.push('math_block', 'math', 0)
      token.block = true
      token.content = content.join('\n').trim()
      token.markup = `\\begin{${envName}}`
      token.map = [startLine, nextLine + 1]
    }
    state.line = nextLine + 1
    return true
  }

  return false
})

markdown.renderer.rules.math_inline = (tokens, idx) => {
  return renderMath(tokens[idx]?.content ?? '', false)
}

markdown.renderer.rules.math_display_inline = (tokens, idx) => {
  return `<span class="math-display-inline">${renderMath(tokens[idx]?.content ?? '', true)}</span>`
}

markdown.renderer.rules.math_block = (tokens, idx) => {
  return `<div class="math-block">${renderMath(tokens[idx]?.content ?? '', true)}</div>`
}

const mathFenceLanguages = new Set(['math', 'latex', 'tex', 'katex'])
const defaultFence = markdown.renderer.rules.fence
markdown.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const info = (token?.info ?? '').trim().split(/\s+/)[0]?.toLowerCase() ?? ''
  if (mathFenceLanguages.has(info)) {
    return `<div class="math-block">${renderMath(token?.content.trim() ?? '', true)}</div>`
  }

  return defaultFence
    ? defaultFence(tokens, idx, options, env, self)
    : self.renderToken(tokens, idx, options)
}

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

export function renderMarkdownHtml(
  markdownSource: string,
  options: RenderMarkdownOptions = {}
): string {
  const source = markdownSource ?? ''
  return markdown.render(options.repairMath ? repairStudyMathMarkdown(source) : source)
}
