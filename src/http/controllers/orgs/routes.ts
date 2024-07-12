import { FastifyInstance } from 'fastify'
import { create } from './org-registry-controller'
import { search } from './org-search-controller'
import { authenticate } from './org-authentication-controller'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs/register', create)
  app.get('/orgs/:name', search)
  app.post('/orgs/auth', authenticate)
}
