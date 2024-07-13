import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/org-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface FetchAvaliablePetsServiceRequest {
  status: string
}

interface FetchAvaliablePetsServiceResponse {
  pets: Pet[]
}

export class FetchAvaliablePetsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async findAvaliable({
    status,
  }: FetchAvaliablePetsServiceRequest): Promise<FetchAvaliablePetsServiceResponse> {
    const pets = await this.petsRepository.findAvaliable(status)

    if (!pets) {
      throw new PetNotFoundError()
    }

    return {
      pets,
    }
  }
}
