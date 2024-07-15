import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

describe('Fetch Nearby Pets E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able list nearby pets', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const org = await prisma.org.create({
      data: {
        name: 'ORG dos Testadores',
        address: 'Rua dos Testadores 123',
        city: 'Fortaleza',
        phone: '(85) 1111-1111',
        password_hash: '123456',
        id: randomUUID(),
      },
    })

    await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Champ',
        breed: 'Golden Retriever',
        about: 'The most beautiful Golden in the city',
        city: 'Fortaleza',
        status: 'Avaliable',
        org_id: org.id,
      })

    await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Champ 2',
        breed: 'Golden Retriever',
        about: 'The most beautiful Golden in the city',
        city: 'Natal',
        status: 'Avaliable',
        org_id: org.id,
      })

    const response = await request(app.server)
      .get('/pets/search/city?city=Fortaleza')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pets: expect.arrayContaining([
        expect.objectContaining({
          about: 'The most beautiful Golden in the city',
          breed: 'Golden Retriever',
          city: 'Fortaleza',
          name: 'Champ',
          org_id: expect.any(String),
          status: 'Avaliable',
        }),
      ]),
    })
  })
})
