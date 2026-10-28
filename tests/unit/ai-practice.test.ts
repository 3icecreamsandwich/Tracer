import {expect,it,vi} from 'vitest'
import {generatePracticeQuestionsText,mixPracticeQuestions} from '../../src/composables/ai/practice'
vi.mock('../../src/composables/ai/builtin/client',()=>({builtinGenerate:vi.fn(async()=>'{"questions":[]}')}))
it('routes built-in practice through the shared allowance service',async()=>{
 const input={title:'Water',description:null,terms:[{front:'Water',back:'H2O'}],count:2}
 await generatePracticeQuestionsText({provider:'tracer.builtin'},input)
 const {builtinGenerate}=await import('../../src/composables/ai/builtin/client')
 expect(builtinGenerate).toHaveBeenCalledWith({operation:'practice',input})
})
it('keeps generated questions in a run even when the baseline already fills its limit',()=>{
 expect(mixPracticeQuestions(['local1','local2'],['ai1','ai2']).slice(0,2)).toEqual(['ai1','local1'])
})

it("includes AI questions in a one-question run",()=>{expect(mixPracticeQuestions(["local"],["ai"]).slice(0,1)).toEqual(["ai"])})
