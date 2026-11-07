import { afterEach,expect,it,vi } from 'vitest'
import {registerModal,unregisterModal,isTopModal,releaseOrphanedScrollLock} from '../../src/composables/modal-stack'
afterEach(()=>vi.unstubAllGlobals())
it('tracks nested dialogs without adding a second body scroll lock',()=>{
  const style={overflow:'',removeProperty:vi.fn()}
  vi.stubGlobal('document',{body:{style},querySelector:()=>null})
  const outer=Symbol(),inner=Symbol()
  registerModal(outer);registerModal(inner)
  expect(isTopModal(inner)).toBe(true);expect(isTopModal(outer)).toBe(false)
  expect(style.overflow).toBe('')
  unregisterModal(inner);expect(isTopModal(outer)).toBe(true)
  unregisterModal(outer);expect(style.removeProperty).not.toHaveBeenCalled()
})
it('recovers an orphaned old lock without unlocking a live dialog',()=>{
  const removeProperty=vi.fn();const querySelector=vi.fn().mockReturnValue({})
  vi.stubGlobal('document',{body:{style:{overflow:'hidden',removeProperty}},querySelector})
  releaseOrphanedScrollLock();expect(removeProperty).not.toHaveBeenCalled()
  querySelector.mockReturnValue(null)
  releaseOrphanedScrollLock();expect(removeProperty).toHaveBeenCalledWith('overflow')
})
