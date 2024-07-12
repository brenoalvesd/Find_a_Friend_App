import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

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
}