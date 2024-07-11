import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgService } from '../authenticate-orgs-service'

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateOrgService(orgsRepository)

  return useCase
}
