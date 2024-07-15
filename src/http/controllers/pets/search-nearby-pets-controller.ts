import { makePetFetchByCity } from '@/services/factories/make-pet-search-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchNearby(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchNearbyPetsQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = searchNearbyPetsQuerySchema.parse(request.query)

  const searchNearbyPetsUseCase = makePetFetchByCity()

  const { pets } = await searchNearbyPetsUseCase.findNearby({
    city,
  })

  return reply.status(200).send({
    pets,
  })
}
