import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/org-repository'

interface OrgRegisterServiceRequest {
  name: string
  city: string
  address: string
  phone: string
  password_hash: string
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
    password_hash,
  }: OrgRegisterServiceRequest): Promise<OrgRegisterServiceResponse> {
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
