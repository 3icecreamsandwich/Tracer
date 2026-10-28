import { isBuiltinModel } from './builtin/types'
import { buildLearnAugmentPrompt } from './practice-prompt'

type Input = Parameters<typeof buildLearnAugmentPrompt>[0]
export async function generatePracticeQuestionsText(model:any,input:Input):Promise<string> {
  if(isBuiltinModel(model)) return (await import('./builtin/client')).builtinGenerate({operation:'practice',input})
  const {generateText}=await import('ai')
  return (await generateText({model,prompt:buildLearnAugmentPrompt(input),maxRetries:0,abortSignal:AbortSignal.timeout(180_000)})).text
}
// Interleave generated questions before limiting the run. Appending them after
// a full baseline previously sliced every AI question out of the result.
export function mixPracticeQuestions<T>(baseline:T[],extra:T[]):T[] {
  const result:T[]=[]
  for(let i=0;i<Math.max(baseline.length,extra.length);i++) {
    if(i<extra.length) result.push(extra[i]!)
    if(i<baseline.length) result.push(baseline[i]!)
  }
  return result
}
