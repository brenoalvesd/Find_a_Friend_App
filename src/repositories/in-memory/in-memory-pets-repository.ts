import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { NoPetsAvaliableError } from '@/services/errors/no-pets-avaliable-error'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      city: data.city,
      breed: data.breed,
      status: data.status ?? 'Avaliable',
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findNearby(city: string) {
    const pet = this.items.filter((pet) => pet.city === city)

    return pet
  }

  async findAvaliable(status: string) {
    const avaliablePet = this.items.filter((pet) => pet.status === 'Avaliable')

    if (!avaliablePet) {
      throw new NoPetsAvaliableError()
    }

    return avaliablePet
  }

  async findByBreed(breed: string) {
    const pet = this.items.filter((pet) => pet.breed === breed)

    return pet
  }
}
