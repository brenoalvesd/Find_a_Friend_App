import { makePetFetchByStatus } from '@/services/factories/make-pet-search-by-status-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchNearbyPetsQuerySchema = z.object({
    status: z.string(),
  })

  const { status } = searchNearbyPetsQuerySchema.parse(request.query)

  const searchNearbyPetsUseCase = makePetFetchByStatus()

  const { pets } = await searchNearbyPetsUseCase.findAvaliable({
    status,
  })

  return reply.status(200).send({
    pets,
  })
}
