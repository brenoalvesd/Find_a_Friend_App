import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegisterService } from '../pet-registry-service'

describe('Pets Registry Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: PetRegisterService

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new PetRegisterService(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create({
      name: 'ONG dos Campeões',
      city: 'São Paulo',
      address: 'Rua Verde 123',
      phone: '(11) 9 1234-5678',
      password_hash: '123456',
      id: 'EXAMPLE-ID-123',
    })

    const { pet } = await sut.execute({
      name: 'Ralph',
      about: 'Lendário Pug #RIP',
      breed: 'Pug',
      city: 'São Paulo',
      status: 'Available',
      org_id: org.id,
    })

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })
})
