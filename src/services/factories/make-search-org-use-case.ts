import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { SearchOrgsService } from '../org-search-by-name-service'

export function makeSearchOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new SearchOrgsService(orgsRepository)

  return useCase
}
