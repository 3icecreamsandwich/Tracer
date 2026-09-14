import { ref } from 'vue'

const testSessionCompleted = ref(false)

export function useTestSessionState() {
  return { testSessionCompleted }
}

export function setTestSessionCompleted(completed: boolean) {
  testSessionCompleted.value = completed
}
