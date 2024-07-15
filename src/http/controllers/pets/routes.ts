import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { fetchNearby } from './search-nearby-pets-controller'
import { fetchByBreed } from './search-pets-by-breed-controller'
import { fetchByStatus } from './search-pets-by-status-controller'
import { registry } from './pet-registry-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search/city', fetchNearby)
  app.get('/pets/search/breed', fetchByBreed)
  app.get('/pets/search/status', fetchByStatus)

  /** If Org is Authenticated */
  app.post('/pets/:org_id', { onRequest: [verifyJWT] }, registry)
}
