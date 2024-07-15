import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Organization Registry E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register organizations', async () => {
    const response = await request(app.server).post('/orgs/register').send({
      name: 'ONG do TypeScript',
      city: 'Fortaleza',
      phone: '(85) 5656-6565',
      password: '123456',
      address: 'Rua Badejo 37',
    })

    expect(response.statusCode).toEqual(201)
  })
})
