import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgService } from '../authenticate-orgs-service'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Organizations Authenticate Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgService(orgsRepository)
  })

  it('should be able to authenticate an organization', async () => {
    await orgsRepository.create({
      name: 'ONG dos Campeões',
      address: 'Rua Verde 321',
      city: 'São Paulo',
      phone: '(11) 99999-9999',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      name: 'ONG dos Campeões',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an org when its name is already registered', async () => {
    await expect(() =>
      sut.execute({
        name: 'ONG dos Campeões',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org when the input password does not matches with the registered one', async () => {
    await orgsRepository.create({
      name: 'ONG dos Campeões',
      address: 'Rua Verde 321',
      city: 'São Paulo',
      phone: '(11) 99999-9999',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        name: 'ONG dos Campeões',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
