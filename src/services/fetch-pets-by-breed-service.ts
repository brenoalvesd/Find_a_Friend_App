import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/org-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface FetchPetsByBreedServiceRequest {
  breed: string
}

interface FetchPetsByBreedServiceResponse {
  pets: Pet[]
}

export class FetchPetsByBreedService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async findByBreed({
    breed,
  }: FetchPetsByBreedServiceRequest): Promise<FetchPetsByBreedServiceResponse> {
    const pets = await this.petsRepository.findByBreed(breed)

    if (!pets) {
      throw new PetNotFoundError()
    }

    return {
      pets,
    }
  }
}
