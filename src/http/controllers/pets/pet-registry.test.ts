import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Pet Registry E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet in an organization', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.create({
      data: {
        name: 'ONG do JavaScript',
        city: 'Fortaleza',
        address: 'Rua Marimbá 321',
        phone: '(85) 9 4321-8765',
        password_hash: await hash('123456', 6),
      },
    })

    const response = await request(app.server)
      .post(`/pets/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ralph',
        about: 'O Pug mais lindo de todos',
        breed: 'Pug',
        city: 'Fortaleza',
        status: 'Avaliable',
        org_id: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
