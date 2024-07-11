import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserRegisterService } from '../user-register-service'

export function makeUserRegistryUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new UserRegisterService(usersRepository)

  return useCase
}
