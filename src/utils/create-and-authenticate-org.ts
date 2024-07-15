import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs/register').send({
    name: 'ONG do TypeScript',
    city: 'Fortaleza',
    phone: '(85) 5656-6565',
    password: '123456',
    address: 'Rua Badejo 37',
  })

  const authResponse = await request(app.server).post('/orgs/auth').send({
    name: 'ONG do TypeScript',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
