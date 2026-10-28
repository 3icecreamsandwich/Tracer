import { defineEventHandler,getRouterParam,createError } from 'h3'
import { authenticatedWebContext } from '../../../utils/web-auth'
import { gatewayContext } from '../../../utils/ai/store'
import { BuiltinAiError } from '../../../../src/composables/ai/builtin/types'
export default defineEventHandler(async event=>{
  const {userId}=await authenticatedWebContext(event)
  const id=getRouterParam(event,'id')
  if(!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw createError({statusCode:400,statusMessage:'Invalid request ID.'})
  try {const {store}=await gatewayContext(event,userId); return await store.call('status',{requestId:id})}
  catch(error) {
    if(error instanceof BuiltinAiError) throw createError({statusCode:error.statusCode,statusMessage:error.message,data:{code:error.code}})
    throw createError({statusCode:503,statusMessage:'Built-in AI is temporarily unavailable.'})
  }
})
