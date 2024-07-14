import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsByBreedService } from '../fetch-pets-by-breed-service'

describe('Pets Search By Breed Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: FetchPetsByBreedService

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByBreedService(petsRepository, orgsRepository)
  })

  it('should be able to search for pets by its breed', async () => {
    await orgsRepository.create({
      name: 'ONG dos Campeões',
      address: 'Rua Verde 321',
      city: 'Fortaleza',
      phone: '(85) 99999-9999',
      password_hash: '123456',
      id: 'EXAMPLE-ORG-ID',
    })

    await petsRepository.create({
      name: 'Ralph',
      city: 'Fortaleza',
      about: 'O Pug mais lindo de todos',
      breed: 'Pug',
      status: 'Avaliable',
      org_id: 'EXAMPLE-ORG-ID',
      id: '123',
    })

    await petsRepository.create({
      name: 'Snoopy',
      city: 'São Paulo',
      about: 'O york-shire que me mordeu',
      breed: 'York-Shire',
      status: 'Unavaliable',
      org_id: 'EXAMPLE-ORG-ID2',
      id: '1234',
    })

    const pet = await sut.findByBreed({
      breed: 'Pug',
    })

    expect(pet.pets).toEqual([
      expect.objectContaining({
        name: 'Ralph',
        about: 'O Pug mais lindo de todos',
        breed: 'Pug',
        city: 'Fortaleza',
        status: 'Avaliable',
        org_id: 'EXAMPLE-ORG-ID',
        id: '123',
      }),
    ])
  })
})
