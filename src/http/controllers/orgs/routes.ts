import { FastifyInstance } from 'fastify'
import { create } from './org-registry-controller'
import { search } from './org-search-controller'
import { authenticate } from './org-authentication-controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs/register', create)
  app.post('/orgs/auth', authenticate)

  /** Authenticated */
  app.get('/orgs/:name', { onRequest: [verifyJWT] }, search)
}
