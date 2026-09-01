import { takeNextChatRevealUnit } from './chat'

export type ChatRevealMessage = {
  content: string
  fullContent?: string
}

type ChatRevealJob = {
  complete: boolean
  pending: string
  timer: ReturnType<typeof setInterval> | null
}

type ChatRevealQueueOptions<T extends ChatRevealMessage> = {
  getMessage: (messageId: string) => T | undefined
  updateMessage: (messageId: string, update: (message: T) => T) => boolean
  onReveal?: () => void
  intervalMs?: number
}

export function createChatRevealQueue<T extends ChatRevealMessage>(
  options: ChatRevealQueueOptions<T>
) {
  const jobs = new Map<string, ChatRevealJob>()
  const intervalMs = options.intervalMs ?? 18

  function stop(messageId: string, job: ChatRevealJob) {
    if (job.timer !== null) clearInterval(job.timer)
    job.timer = null
    jobs.delete(messageId)
  }

  function revealNext(messageId: string, job: ChatRevealJob) {
    const next = takeNextChatRevealUnit(job.pending, job.complete)
    if (!next) return false
    job.pending = next.pending
    const updated = options.updateMessage(messageId, (message) => ({
      ...message,
      content: `${message.content}${next.unit}`
    }))
    if (updated) options.onReveal?.()
    return updated
  }

  function start(messageId: string, job: ChatRevealJob) {
    if (job.timer !== null) return
    job.timer = setInterval(() => {
      const current = jobs.get(messageId)
      if (!current) return
      revealNext(messageId, current)
      if (!current.pending) stop(messageId, current)
    }, intervalMs)
  }

  function enqueue(messageId: string, chunk: string) {
    if (!chunk) return
    const updated = options.updateMessage(messageId, (message) => ({
      ...message,
      fullContent: `${message.fullContent ?? message.content}${chunk}`
    }))
    if (!updated) return

    let job = jobs.get(messageId)
    if (!job) {
      job = { complete: false, pending: '', timer: null }
      jobs.set(messageId, job)
    }
    job.pending += chunk
    if (!options.getMessage(messageId)?.content) revealNext(messageId, job)
    start(messageId, job)
  }

  function finish(messageId: string) {
    const job = jobs.get(messageId)
    if (!job) return
    job.complete = true
    if (!job.pending) stop(messageId, job)
    else start(messageId, job)
  }

  function flush() {
    let updated = false
    for (const [messageId, job] of jobs) {
      if (job.pending) {
        const pending = job.pending
        updated = options.updateMessage(messageId, (message) => ({
          ...message,
          content: `${message.content}${pending}`
        })) || updated
        job.pending = ''
      }
      stop(messageId, job)
    }
    if (updated) options.onReveal?.()
  }

  function cancel(messageId: string) {
    const job = jobs.get(messageId)
    if (job) stop(messageId, job)
  }

  function cancelAll() {
    for (const [messageId, job] of jobs) stop(messageId, job)
  }

  return { enqueue, finish, flush, cancel, cancelAll }
}
