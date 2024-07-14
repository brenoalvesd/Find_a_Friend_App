import { FastifyInstance } from 'fastify'
import { registry } from './pet-registry-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:org_id', registry)
}
