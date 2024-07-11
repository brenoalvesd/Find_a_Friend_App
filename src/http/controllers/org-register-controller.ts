import { makeRegisterOrgUseCase } from '@/services/factories/make-org-registry-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    address: z.string(),
    phone: z.string(),
    password_hash: z.string().min(6),
  })

  const { name, city, address, phone, password_hash } =
    createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeRegisterOrgUseCase()

  await createOrgUseCase.execute({
    name,
    city,
    address,
    phone,
    password_hash,
  })

  return reply.status(201).send()
}
