import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findNearby(city: string): Promise<Pet[]>
  findAvaliable(status: string): Promise<Pet[]>
  findByBreed(status: string): Promise<Pet[]>
}
