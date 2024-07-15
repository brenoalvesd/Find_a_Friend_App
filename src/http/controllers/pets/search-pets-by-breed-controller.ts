import { makePetFetchByBreed } from '@/services/factories/make-pet-search-by-breed-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByBreed(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetsByBreedQuerySchema = z.object({
    breed: z.string(),
  })

  const { breed } = searchPetsByBreedQuerySchema.parse(request.query)

  const searchPetsByBreedUseCase = makePetFetchByBreed()

  const { pets } = await searchPetsByBreedUseCase.findByBreed({
    breed,
  })

  return reply.status(200).send({
    pets,
  })
}
