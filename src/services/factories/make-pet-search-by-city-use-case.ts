import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchNearbyPetsService } from '../fetch-nearby-pets-service'

export function makePetFetchByCity() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new FetchNearbyPetsService(petsRepository, orgsRepository)

  return useCase
}
