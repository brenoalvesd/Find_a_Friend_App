import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgRegisterService } from '../org-register-service'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new OrgRegisterService(orgsRepository)

  return useCase
}
