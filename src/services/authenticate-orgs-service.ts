import { OrgsRepository } from '@/repositories/org-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface AuthenticateOrgServiceRequest {
  name: string
  password: string
}

interface AuthenticateOrgServiceResponse {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByName(name)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
