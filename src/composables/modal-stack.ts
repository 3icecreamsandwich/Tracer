// Nuxt UI / Reka UI owns scroll locking and focus restoration. Keep this stack
// only for modal ordering; a second body lock can restore a stale hidden value.
const stack: symbol[] = []
export function registerModal(id: symbol) {
  if (!stack.includes(id)) stack.push(id)
}
export function unregisterModal(id: symbol) {
  const index = stack.indexOf(id)
  if (index >= 0) stack.splice(index, 1)
}
export function isTopModal(id: symbol) { return stack.at(-1) === id }
export function releaseOrphanedScrollLock() {
  if (typeof document === 'undefined' || stack.length || document.querySelector('[data-dismissable-layer][data-state="open"]')) return
  if (document.body.style.overflow === 'hidden') document.body.style.removeProperty('overflow')
}
