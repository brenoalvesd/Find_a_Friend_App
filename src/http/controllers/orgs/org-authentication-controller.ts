import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/services/factories/make-org-auth-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrgBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6),
  })

  const { name, password } = authenticateOrgBodySchema.parse(request.body)

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

    await authenticateOrgUseCase.execute({
      name,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
  return reply.status(200).send()
}
