import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchAvaliablePetsService } from '../fetch-avaliable-pets-service'

export function makePetFetchByStatus() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new FetchAvaliablePetsService(petsRepository, orgsRepository)

  return useCase
}
