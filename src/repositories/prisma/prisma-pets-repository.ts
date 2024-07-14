import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findByBreed(breed: string) {
    const pets = await prisma.pet.findMany({
      where: {
        breed,
      },
    })

    return pets
  }

  async findNearby(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAvaliable(status: string) {
    const pets = await prisma.pet.findMany({
      where: {
        status: {
          contains: 'Avaliable',
        },
      },
    })

    return pets
  }
}
