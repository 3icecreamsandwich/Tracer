import { beforeEach, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ session: null as any, requests: [] as string[], restore: vi.fn() }))
vi.mock('../../src/composables/auth/session', () => ({ restoreAuthSession: state.restore }))
vi.mock('../../src/composables/auth/client', () => ({
  isSupabaseConfigured: () => true,
  getSupabaseClient: () => ({
    auth: { getSession: async () => ({ data: { session: state.session } }) },
    from: (table: string) => {
      state.requests.push(table)
      const query: any = {
        select: () => query, is: () => query, eq: () => query, order: () => query,
        then: (resolve: (value: unknown) => void) => Promise.resolve({ data: [], count: table === 'assignments' ? 0 : 2, error: null }).then(resolve),
      }
      return query
    },
  }),
}))
import { getClassroomOverview, listClassroomAssignments, listClassrooms } from '../../src/composables/classrooms'
let sequence = 0
beforeEach(() => {
  state.session = null
  state.requests = []
  const session = { user: { id: `startup-user-${++sequence}` } }
  state.restore.mockReset().mockImplementation(async () => {
    state.session = session
    return { online: true, identity: session.user }
  })
})
it('does not wait for provider-key synchronization to restore the classroom session', async () => {
  await listClassrooms()
  expect(state.restore).toHaveBeenCalledWith({ waitForProviderKeySync: false })
})
it('shares the assignment request between the overview and assignment list', async () => {
  const [overview, assignments] = await Promise.all([
    getClassroomOverview('class-a'), listClassroomAssignments('class-a'),
  ])
  expect(overview).toEqual({ memberCount: 2, assignmentCount: 0 })
  expect(assignments).toEqual([])
  expect(state.requests.filter(table => table === 'assignments')).toHaveLength(1)
  expect(state.requests.filter(table => table === 'class_memberships')).toHaveLength(1)
})
