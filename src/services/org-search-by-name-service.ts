import { OrgsRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'

interface SearchOrgsServiceRequest {
  name: string
}

interface SearchOrgsServiceResponse {
  org: Org | null
}

export class SearchOrgsService {
  constructor(private orgsRepository: OrgsRepository) {}

  async findByName({
    name,
  }: SearchOrgsServiceRequest): Promise<SearchOrgsServiceResponse> {
    const org = await this.orgsRepository.findByName(name)
    return { org }
  }
}
