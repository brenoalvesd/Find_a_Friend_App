import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/org-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface FetchNearbyPetsServiceRequest {
  city: string
}

interface FetchNearbyPetsServiceResponse {
  pets: Pet[]
}

export class FetchNearbyPetsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async findNearby({
    city,
  }: FetchNearbyPetsServiceRequest): Promise<FetchNearbyPetsServiceResponse> {
    const organizationCity = await this.orgsRepository.findByCity(city)
    const pets = await this.petsRepository.findNearby(city)

    if (!organizationCity) {
      throw new OrgNotFoundError()
    }

    return {
      pets,
    }
  }
}
