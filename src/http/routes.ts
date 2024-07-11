import { FastifyInstance } from 'fastify'
import { register } from './controllers/user-register-controller'
import { create } from './controllers/org-register-controller'
import { search } from './controllers/org-search-controller'
import { authenticate } from './controllers/org-authentication-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/orgs/register', create)
  app.get('/orgs/:name', search)
  app.post('/orgs/auth', authenticate)
}
