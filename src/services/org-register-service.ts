import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'

interface OrgRegisterServiceRequest {
  name: string
  city: string
  address: string
  phone: string
  password: string
}

interface OrgRegisterServiceResponse {
  org: Org
}

export class OrgRegisterService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    city,
    address,
    phone,
    password,
  }: OrgRegisterServiceRequest): Promise<OrgRegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      city,
      address,
      phone,
      password_hash,
    })

    return {
      org,
    }
  }
}
