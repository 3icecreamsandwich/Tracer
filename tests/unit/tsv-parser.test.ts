import { describe, expect, it } from 'vitest'
import { parseTermsDelimited, parseTermsTsv, TsvParseError } from '../../src/composables/db/validators/tsv'

describe('parseTermsTsv', () => {
  it('parses valid TSV into term inputs', () => {
    const input = 'hello\tworld\nfoo\tbar\n'
    expect(parseTermsTsv(input)).toEqual([
      { front: 'hello', back: 'world' },
      { front: 'foo', back: 'bar' }
    ])
  })

  it('ignores empty lines and trims surrounding whitespace', () => {
    const input = '\n  a\tb  \n\n\r\n  c\td\n'
    expect(parseTermsTsv(input)).toEqual([
      { front: 'a', back: 'b' },
      { front: 'c', back: 'd' }
    ])
  })

  it('rejects a line without a tab', () => {
    expect(() => parseTermsTsv('nope\n')).toThrow(TsvParseError)
    expect(() => parseTermsTsv('nope\n')).toThrow('must contain a tab')
  })

  it('rejects a line with multiple tabs', () => {
    expect(() => parseTermsTsv('a\tb\tc\n')).toThrow(TsvParseError)
    expect(() => parseTermsTsv('a\tb\tc\n')).toThrow('exactly one tab')
  })

  it('rejects empty input after filtering empty lines', () => {
    expect(() => parseTermsTsv('\n\n\r\n')).toThrow(TsvParseError)
    expect(() => parseTermsTsv('\n\n\r\n')).toThrow('no terms found')
  })
})

describe('parseTermsDelimited', () => {
  it('auto-detects TSV and skips a header row', () => {
    expect(parseTermsDelimited('term\tdefinition\nA\tB\n')).toEqual([
      { front: 'A', back: 'B' }
    ])
  })

  it('keeps commas inside generated LaTeX when tab is the required separator', () => {
    const input = [
      'Differentiable on $[a,b]$\t$f$ is differentiable on $(a,b)$ and continuous on $[a,b]$',
      'Point $(x_0,y_0)$\tThe point has coordinates $(x_0,y_0)$'
    ].join('\n')

    expect(parseTermsDelimited(input, { delimiter: 'tab' })).toEqual([
      {
        front: 'Differentiable on $[a,b]$',
        back: '$f$ is differentiable on $(a,b)$ and continuous on $[a,b]$'
      },
      {
        front: 'Point $(x_0,y_0)$',
        back: 'The point has coordinates $(x_0,y_0)$'
      }
    ])
  })

  it('auto-detects CSV and supports quoted cells', () => {
    expect(parseTermsDelimited('"hello, term","world, definition"\nfoo,bar\n')).toEqual([
      { front: 'hello, term', back: 'world, definition' },
      { front: 'foo', back: 'bar' }
    ])
  })

  it('accepts generated bullets and numbering', () => {
    expect(parseTermsDelimited('- alpha\tone\n1. beta\ttwo\n')).toEqual([
      { front: 'alpha', back: 'one' },
      { front: 'beta', back: 'two' }
    ])
  })

  it('uses the first two fields when extra CSV fields are present', () => {
    expect(parseTermsDelimited('a,b,c\n')).toEqual([{ front: 'a', back: 'b' }])
  })

  it('parses markdown table output and skips generated preamble text', () => {
    const input = [
      'Here are the flashcards:',
      '| Term | Definition |',
      '| --- | --- |',
      '| alpha | one |',
      '| beta | two |'
    ].join('\n')

    expect(parseTermsDelimited(input)).toEqual([
      { front: 'alpha', back: 'one' },
      { front: 'beta', back: 'two' }
    ])
  })

  it('accepts colon, semicolon, and spaced dash separators from generated output', () => {
    const input = [
      'Flashcards:',
      'alpha: one',
      'beta; two',
      'gamma - three',
      'delta — four'
    ].join('\n')

    expect(parseTermsDelimited(input)).toEqual([
      { front: 'alpha', back: 'one' },
      { front: 'beta', back: 'two' },
      { front: 'gamma', back: 'three' },
      { front: 'delta', back: 'four' }
    ])
  })

  it('rejects malformed rows without a delimiter', () => {
    expect(() => parseTermsDelimited('nope\n')).toThrow(TsvParseError)
    expect(() => parseTermsDelimited('nope\n')).toThrow('comma or tab')
  })

  it('can append delimiterless continuation lines for generated math definitions', () => {
    const input = [
      'Derivative\tThe instantaneous rate of change is $$',
      '\\\\frac{dy}{dx}',
      '$$ at a point.',
      'Integral\tAccumulated change.'
    ].join('\n')

    expect(parseTermsDelimited(input, {
      delimiter: 'auto',
      allowContinuationLines: true
    })).toEqual([
      {
        front: 'Derivative',
        back: 'The instantaneous rate of change is $$\n\\\\frac{dy}{dx}\n$$ at a point.'
      },
      { front: 'Integral', back: 'Accumulated change.' }
    ])
  })
})
