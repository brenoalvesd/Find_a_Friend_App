import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

describe('Fetch Orgs by Name E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able list an Org data by its name', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const org = await prisma.org.create({
      data: {
        name: 'ONG do Rio',
        city: 'RJ',
        phone: '(21) 9 2121-6565',
        password_hash: randomUUID(),
        address: 'Rua Rio 21',
        id: randomUUID(),
      },
    })

    await request(app.server).post('/orgs/auth').send({
      name: 'ONG do Rio',
      password: org.password_hash,
    })

    const response = await request(app.server)
      .get('/orgs/name?name=ONG do Rio')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      org: {
        id: org.id,
        name: 'ONG do Rio',
        address: 'Rua Rio 21',
        city: 'RJ',
        phone: '(21) 9 2121-6565',
      },
    })
  })
})
