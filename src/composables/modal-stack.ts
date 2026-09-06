const stack: symbol[] = []
let originalOverflow = ''
export function registerModal(id: symbol) {
  if (stack.includes(id)) return
  if (!stack.length) {
    originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  stack.push(id)
}
export function unregisterModal(id: symbol) {
  const index = stack.indexOf(id)
  if (index < 0) return
  stack.splice(index, 1)
  if (!stack.length) document.body.style.overflow = originalOverflow
}
export function isTopModal(id: symbol) {
  return stack.at(-1) === id
}
