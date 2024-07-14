import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByBreedService } from '../fetch-pets-by-breed-service'

export function makePetFetchByBreed() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new FetchPetsByBreedService(petsRepository, orgsRepository)

  return useCase
}
