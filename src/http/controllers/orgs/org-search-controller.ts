import { makeSearchOrgUseCase } from '@/services/factories/make-search-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchOrgParamsSchema = z.object({
    name: z.string(),
  })

  const { name } = searchOrgParamsSchema.parse(request.params)

  const searchOrgUseCase = makeSearchOrgUseCase()

  const { org } = await searchOrgUseCase.findByName({
    name,
  })

  return reply.status(201).send({ org })
}