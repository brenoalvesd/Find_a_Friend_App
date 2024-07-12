import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/org-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface PetRegisterServiceRequest {
  name: string
  about: string
  city: string
  breed: string
  status: string
  org_id: string
}

interface PetRegisterServiceResponse {
  pet: Pet
}

export class PetRegisterService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    city,
    breed,
    status,
    org_id,
  }: PetRegisterServiceRequest): Promise<PetRegisterServiceResponse> {
    const organization = await this.orgsRepository.findById(org_id)

    if (!organization) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      city,
      breed,
      status,
      org_id,
    })

    return { pet }
  }
}
