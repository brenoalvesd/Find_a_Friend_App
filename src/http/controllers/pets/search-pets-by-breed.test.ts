import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

describe('Fetch Pets by Breed E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able list pets by its breed', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const org = await prisma.org.create({
      data: {
        name: 'ORG dos Testers',
        address: 'Rua dos Testers 123',
        city: 'Fortaleza',
        phone: '(85) 2222-2222',
        password_hash: '123456',
        id: randomUUID(),
      },
    })

    await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Champ',
        breed: 'Golden',
        about: 'The most beautiful Golden in the city',
        city: 'Fortaleza',
        status: 'Avaliable',
        org_id: org.id,
      })

    await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ralph the Pug',
        breed: 'Pug',
        about: 'The most beautiful Pug in the city',
        city: 'Fortaleza',
        status: 'Avaliable',
        org_id: org.id,
      })

    const response = await request(app.server)
      .get('/pets/search/breed?breed=Golden')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pets: expect.arrayContaining([
        expect.objectContaining({
          about: 'The most beautiful Golden in the city',
          breed: 'Golden',
          city: 'Fortaleza',
          name: 'Champ',
          org_id: expect.any(String),
          status: 'Avaliable',
        }),
      ]),
    })
  })
})
