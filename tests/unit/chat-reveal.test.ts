import { afterEach, describe, expect, it, vi } from 'vitest'
import { createChatRevealQueue } from '../../src/composables/ai/chat-reveal'

type Message = { id: string; content: string; fullContent?: string }

describe('chat reveal queue', () => {
  afterEach(() => vi.useRealTimers())

  it('reveals provider-sized chunks one word at a time while retaining full content', () => {
    vi.useFakeTimers()
    let messages: Message[] = [{ id: 'answer', content: '', fullContent: '' }]
    const queue = createChatRevealQueue<Message>({
      getMessage: (id) => messages.find((message) => message.id === id),
      updateMessage: (id, update) => {
        const index = messages.findIndex((message) => message.id === id)
        if (index < 0) return false
        messages = messages.map((message, current) => current === index ? update(message) : message)
        return true
      },
      intervalMs: 10
    })

    queue.enqueue('answer', 'One two three')
    expect(messages[0]).toMatchObject({ content: 'One ', fullContent: 'One two three' })

    vi.advanceTimersByTime(10)
    expect(messages[0]?.content).toBe('One two ')

    queue.finish('answer')
    vi.advanceTimersByTime(10)
    expect(messages[0]?.content).toBe('One two three')
  })

  it('can flush or cancel pending reveals', () => {
    vi.useFakeTimers()
    let message: Message = { id: 'answer', content: '', fullContent: '' }
    const queue = createChatRevealQueue<Message>({
      getMessage: () => message,
      updateMessage: (_id, update) => {
        message = update(message)
        return true
      },
      intervalMs: 10
    })

    queue.enqueue('answer', 'One two three')
    queue.flush()
    expect(message.content).toBe('One two three')

    queue.enqueue('answer', ' four five')
    queue.cancelAll()
    vi.advanceTimersByTime(100)
    expect(message.content).toBe('One two three')
    expect(message.fullContent).toBe('One two three four five')
  })
})
