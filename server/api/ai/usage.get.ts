import { defineEventHandler,createError } from 'h3'
import { authenticatedWebContext } from '../../utils/web-auth'
import { gatewayContext,usage } from '../../utils/ai/store'
import { BuiltinAiError } from '../../../src/composables/ai/builtin/types'
export default defineEventHandler(async event=>{
  const {userId}=await authenticatedWebContext(event)
  try { const context=await gatewayContext(event,userId); return await usage(context.store,context.enabled) }
  catch(error) {
    if(error instanceof BuiltinAiError) throw createError({statusCode:error.statusCode,statusMessage:error.message,data:{code:error.code,message:error.message}})
    throw createError({statusCode:503,statusMessage:'Built-in AI is temporarily unavailable.'})
  }
})
