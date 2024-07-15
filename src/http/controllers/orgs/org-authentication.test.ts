import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Organization Authentication E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an organization', async () => {
    await request(app.server).post('/orgs/register').send({
      name: 'ONG do TypeScript',
      city: 'Fortaleza',
      phone: '(85) 5656-6565',
      password: '123456',
      address: 'Rua Badejo 37',
    })

    const response = await request(app.server).post('/orgs/auth').send({
      name: 'ONG do TypeScript',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
