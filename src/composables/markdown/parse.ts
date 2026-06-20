import MarkdownIt from 'markdown-it'
import katex from 'katex'

const markdown = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
  breaks: false
})

markdown.disable('image')

function renderMath(source: string, displayMode: boolean) {
  try {
    return katex.renderToString(source, {
      displayMode,
      throwOnError: false,
      strict: 'ignore',
      trust: false
    })
  } catch {
    return `<code>${markdown.utils.escapeHtml(source)}</code>`
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

export function renderMarkdownHtml(markdownSource: string): string {
  return markdown.render(markdownSource ?? '')
}
