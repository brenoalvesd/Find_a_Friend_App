import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/services/factories/make-org-registry-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { name, city, address, phone, password } = createOrgBodySchema.parse(
    request.body,
  )

  try {
    const createOrgUseCase = makeRegisterOrgUseCase()

    await createOrgUseCase.execute({
      name,
      city,
      address,
      phone,
      password,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
  return reply.status(201).send()
}
