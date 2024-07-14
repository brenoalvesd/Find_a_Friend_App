import { PetNotFoundError } from '@/services/errors/pet-not-found-error'
import { makePetRegistryUseCase } from '@/services/factories/make-pet-registry-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registry(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    org_id: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    about: z.string(),
    breed: z.string(),
    status: z.string(),
  })

  const { name, city, about, breed, status } = createPetBodySchema.parse(
    request.body,
  )

  const { org_id } = createPetParamsSchema.parse(request.params)

  try {
    const createPetUseCase = makePetRegistryUseCase()

    await createPetUseCase.execute({
      name,
      city,
      about,
      breed,
      status,
      org_id,
    })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
