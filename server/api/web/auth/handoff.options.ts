import { setHeader, setResponseStatus } from 'h3'
import { allowLandingAuthOrigin } from '../../../utils/web-auth-handoff'

export default defineEventHandler((event) => {
  allowLandingAuthOrigin(event)
  setHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Authorization, Content-Type')
  setHeader(event, 'Access-Control-Max-Age', '600')
  setResponseStatus(event, 204)
  return null
})
